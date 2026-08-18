# Portfolio Website (AWS Serverless)

A high-performance, modern portfolio built with a serverless-first architecture on AWS. The project utilizes a fast **Vite + React** frontend and a robust **Rust** backend, delivering a seamless user experience with minimal infrastructure overhead.

---

## Key Features

* **Automated GitHub Sync & S3 Caching**: The backend automatically fetches and writes fresh data directly to S3 on a scheduled basis (such as once an hour), so client requests are served instantly from static storage without needing to spin up an instance or query external APIs on every page load.
* **S3-Backed Content Management**: Project data is stored in an S3 JSON file, allowing you to manually edit project details, descriptions, and ordering without requiring a full redeployment.
* **Serverless Architecture**: Powered by AWS Lambda (Custom Runtime `provided.al2023`) and Amazon API Gateway for extreme scalability and cost-efficiency.
* **High Performance**: Leveraging Rust for the backend ensures rapid execution speed and exceptionally low latency.

---

## Tech Stack

* **Frontend**: Vite, React
* **Backend**: Rust (AWS Lambda)
* **Storage**: Amazon S3

---


## Prerequisites

Make sure you have the following tools installed on your local machine:

* **Node.js**: [Download](https://nodejs.org/) (required for frontend development)
* **Rust**: [Install via rustup](https://www.rust-lang.org/tools/install) (required for backend compilation)

---

## Setup & Development

## 1. Clone the Repository
```bash
git clone git clone https://github.com/noahbelstad/PortfolioWebsite.git
cd PortfolioWebsite
```

### 2. Frontend Development
```bash
cd frontend
npm install
npm run dev
```

* Deployment Note: Once built, the static assets located in PortfolioWebsite/frontend/dist/ can be hosted directly via an Amazon S3 static website or an AWS Amplify app.
  
## 3. Build & Test Backend
```bash
cd backend
cargo lambda build --release
```
* Deployment Note: This compiles your code into an optimized bootstrap binary located at PortfolioWebsite/backend/target/lambda/backend/.bootstrap this file can then be zipped and uploaded directly to your AWS Lambda function. Configure the Lambda function to trigger periodically every hour using an event scheduler.
