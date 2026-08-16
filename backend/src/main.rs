use aws_sdk_s3::Client as S3Client;
use lambda_runtime::{Error, LambdaEvent, service_fn};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Project {
    id: String,
    title: String,
    description: Option<String>,
    html_url: String,
}

#[derive(Deserialize, Debug)]
struct GitHubRepo {
    id: i64,
    name: String,
    description: Option<String>,
    html_url: String,
}

// Actual GitHub fetch function
async fn fetch_github_repos() -> Result<Vec<GitHubRepo>, reqwest::Error> {
    let github_username = "noahbelstad";
    let url = format!("https://api.github.com/users/{}/repos", github_username);

    let client = reqwest::Client::new();
    let repos = client
        .get(&url)
        .header("User-Agent", "portfolio-backend")
        .send()
        .await?
        .json::<Vec<GitHubRepo>>()
        .await?;

    Ok(repos)
}

// Handler function triggered by Lambda / EventBridge
async fn function_handler(_event: LambdaEvent<serde_json::Value>) -> Result<(), Error> {
    // 1. Fetch from GitHub
    let repos = fetch_github_repos().await?;

    // 2. Map to your Project struct
    let projects: Vec<Project> = repos
        .into_iter()
        .map(|r| Project {
            id: r.id.to_string(),
            title: r.name,
            description: r.description,
            html_url: r.html_url,
        })
        .collect();

    let json_data = serde_json::to_string(&projects)?;

    // 3. Set up AWS SDK config and S3 Client
    let config = aws_config::load_defaults(aws_config::BehaviorVersion::latest()).await;
    let s3_client = S3Client::new(&config);

    // 4. Upload to S3 (converted string to bytes using .into_bytes())
    let bucket_name = std::env::var("BUCKET_NAME")
        .unwrap_or_else(|_| "noahbelstad-portfolio-storage".to_string());

    s3_client
        .put_object()
        .bucket(bucket_name)
        .key("projects.json")
        .body(json_data.into_bytes().into())
        .content_type("application/json")
        .send()
        .await?;

    println!("Successfully updated projects.json in S3!");
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let func = service_fn(function_handler);
    lambda_runtime::run(func).await
}
