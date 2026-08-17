// cargo lambda build --release --target x86_64-unknown-linux-musl

use aws_sdk_s3::Client as S3Client;
use chrono::{Datelike, Local};
use lambda_runtime::{Error, LambdaEvent, service_fn};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
struct Project {
    id: String,
    title: String,
    description: Option<String>,
    category: String,
    featured: bool,
    tags: Vec<String>,
    github_url: String,
    live_url: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
struct WeeklyCommit {
    day: String,
    date: String,
    commits: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
struct GitHistory {
    total_commits: u32,
    weekly_commits: Vec<WeeklyCommit>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
struct PortfolioData {
    projects: Vec<Project>,
    git_history: GitHistory,
}

#[derive(Deserialize, Debug)]
struct GitHubRepo {
    id: i64,
    name: String,
    description: Option<String>,
    html_url: String,
    homepage: Option<String>,
    language: Option<String>,
    topics: Option<Vec<String>>,
    stargazers_count: Option<u32>,
}

#[derive(Deserialize, Debug)]
struct RepoInfo {
    name: String,
}

#[derive(Deserialize, Debug)]
struct CommitItem {
    message: String,
}

#[derive(Deserialize, Debug)]
struct EventPayload {
    commits: Option<Vec<CommitItem>>,
}

#[derive(Deserialize, Debug)]
struct GitHubEvent {
    #[serde(rename = "type")]
    event_type: String,
    created_at: String,
    repo: RepoInfo,
    payload: Option<EventPayload>,
}

async fn fetch_github_repos(client: &reqwest::Client) -> Result<Vec<GitHubRepo>, reqwest::Error> {
    let url = "https://api.github.com/users/noahbelstad/repos?per_page=100&sort=updated";
    let mut req = client
        .get(url)
        .header("User-Agent", "noahbelstad-portfolio-backend")
        .header("Accept", "application/vnd.github.v3+json");

    if let Ok(token) = std::env::var("GITHUB_TOKEN") {
        req = req.header("Authorization", format!("Bearer {}", token));
    }

    req.send().await?.json::<Vec<GitHubRepo>>().await
}

async fn fetch_github_commits(client: &reqwest::Client) -> Result<GitHistory, Error> {
    let url = "https://api.github.com/users/noahbelstad/events?per_page=100";
    let mut req = client
        .get(url)
        .header("User-Agent", "noahbelstad-portfolio-backend")
        .header("Accept", "application/vnd.github.v3+json");

    if let Ok(token) = std::env::var("GITHUB_TOKEN") {
        req = req.header("Authorization", format!("Bearer {}", token));
    }

    let response = req.send().await?;
    let events = match response.json::<Vec<GitHubEvent>>().await {
        Ok(ev) => ev,
        Err(e) => {
            eprintln!("Failed to parse GitHub events JSON: {:?}", e);
            Vec::new()
        }
    };

    let mut commits_by_date: HashMap<String, Vec<String>> = HashMap::new();
    let mut total_commits = 0;

    for event in events {
        if event.event_type == "PushEvent" {
            let date_key = event.created_at.chars().take(10).collect::<String>();
            let mut logged_commit = false;

            if let Some(ref payload) = event.payload {
                if let Some(ref commits) = payload.commits {
                    if !commits.is_empty() {
                        logged_commit = true;
                        for commit in commits {
                            let msg = commit
                                .message
                                .lines()
                                .next()
                                .unwrap_or(&commit.message)
                                .to_string();
                            commits_by_date
                                .entry(date_key.clone())
                                .or_default()
                                .push(msg);
                            total_commits += 1;
                        }
                    }
                }
            }

            // Fallback for when GitHub omits payload.commits in the event payload
            if !logged_commit {
                let repo_clean_name = event
                    .repo
                    .name
                    .split('/')
                    .last()
                    .unwrap_or(&event.repo.name);
                let msg = format!("Pushed to {}", repo_clean_name);
                commits_by_date.entry(date_key).or_default().push(msg);
                total_commits += 1;
            }
        }
    }

    let mut weekly_commits = Vec::new();
    let today = Local::now().date_naive();

    for i in (0..7).rev() {
        let date = today - chrono::Duration::days(i);
        let date_str = date.format("%Y-%m-%d").to_string();
        let day_name = date.format("%a").to_string();
        let formatted_date = date.format("%b %d").to_string();

        let day_commits = commits_by_date.remove(&date_str).unwrap_or_default();

        weekly_commits.push(WeeklyCommit {
            day: day_name,
            date: formatted_date,
            commits: day_commits,
        });
    }

    Ok(GitHistory {
        total_commits,
        weekly_commits,
    })
}

async fn function_handler(_event: LambdaEvent<serde_json::Value>) -> Result<(), Error> {
    let http_client = reqwest::Client::new();
    let shared_config = aws_config::load_from_env().await;
    let s3_client = S3Client::new(&shared_config);

    let bucket_name = std::env::var("BUCKET_NAME")
        .unwrap_or_else(|_| "portfolio-storage-851725639779-eu-north-1-an".to_string());

    // 1. Fetch existing projects.json from S3 to preserve manual edits
    let existing_portfolio: Option<PortfolioData> = match s3_client
        .get_object()
        .bucket(&bucket_name)
        .key("projects.json")
        .send()
        .await
    {
        Ok(response) => {
            if let Ok(bytes) = response.body.collect().await {
                serde_json::from_slice::<PortfolioData>(&bytes.to_vec()).ok()
            } else {
                None
            }
        }
        Err(_) => None,
    };

    // 2. Fetch latest repositories and commits from GitHub
    let fetched_repos = fetch_github_repos(&http_client).await?;
    let git_history = fetch_github_commits(&http_client).await?;

    let fetched_projects: Vec<Project> = fetched_repos
        .into_iter()
        .map(|r| {
            let category = r.language.clone().unwrap_or_else(|| "General".to_string());
            let mut tags = r.topics.clone().unwrap_or_default();
            if tags.is_empty() {
                if let Some(ref lang) = r.language {
                    tags.push(lang.clone());
                }
            }
            let is_featured = r.stargazers_count.unwrap_or(0) > 0
                || tags.iter().any(|t| t.to_lowercase() == "featured");

            Project {
                id: r.id.to_string(),
                title: r.name,
                description: r.description,
                category,
                featured: is_featured,
                tags,
                github_url: r.html_url,
                live_url: r.homepage.unwrap_or_default(),
            }
        })
        .collect();

    // 3. Merge projects (keep manual edits, add new GitHub repos)
    let mut final_projects: Vec<Project> = Vec::new();
    let mut known_keys: HashSet<String> = HashSet::new();

    if let Some(existing) = existing_portfolio {
        for proj in existing.projects {
            known_keys.insert(proj.id.clone());
            known_keys.insert(proj.title.clone());
            final_projects.push(proj);
        }
    }

    for fetched_proj in fetched_projects {
        if !known_keys.contains(&fetched_proj.id) && !known_keys.contains(&fetched_proj.title) {
            final_projects.push(fetched_proj);
        }
    }

    // 4. Wrap final payload and upload to S3
    let portfolio_payload = PortfolioData {
        projects: final_projects,
        git_history,
    };

    let json_data = serde_json::to_string(&portfolio_payload)?;

    s3_client
        .put_object()
        .bucket(bucket_name)
        .key("projects.json")
        .body(json_data.into_bytes().into())
        .content_type("application/json")
        .send()
        .await?;

    println!("Successfully updated projects and real commit history in S3!");
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let func = service_fn(function_handler);
    lambda_runtime::run(func).await
}
