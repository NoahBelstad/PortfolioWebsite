use axum::{routing::get, Json, Router};
use tower_http::cors::CorsLayer;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    // Enable CORS for frontend development
    let cors = CorsLayer::permissive();

    // Build routes
    let app = Router::new()
        .route("/api/hello", get(handler))
        .layer(cors);

    // Run server on localhost:8080
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("Rust backend running on http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Json<serde_json::Value> {
    Json(serde_json::json!({ "message": "Hello from the Rust backend!" }))
}
