from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager

load_dotenv()

# Import routes
from routes import auth, products, recommendations, wishlist

# Lifecycle
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting Glam AI Backend")
    yield
    print("🛑 Shutting down Glam AI Backend")

app = FastAPI(
    title="Glam AI API",
    description="AI-powered virtual try-on and product recommendations",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(products.router, prefix="/api/v1/products", tags=["Products"])
app.include_router(recommendations.router, prefix="/api/v1/recommendations", tags=["Recommendations"])
app.include_router(wishlist.router, prefix="/api/v1/wishlist", tags=["Wishlist"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Glam AI API",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "glam-ai-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )
