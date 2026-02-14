"""
FastAPI Application Entry Point
Clean Architecture - Presentation Layer
"""
from dotenv import load_dotenv

# Load environment variables FIRST before any other imports
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from presentation.api.routes import contact, projects, resume


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Portfolio API starting up...")
    yield
    # Shutdown
    print("👋 Portfolio API shutting down...")


# Create FastAPI application
app = FastAPI(
    title="Liam T. Nguyen Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for resume PDFs
os.makedirs("static/resumes", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(contact.router, prefix="/api/v1", tags=["Contact"])
app.include_router(projects.router, prefix="/api/v1", tags=["Projects"])
app.include_router(resume.router, prefix="/api/v1", tags=["Resume"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Liam T. Nguyen Portfolio API",
        "status": "operational",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "api_version": "1.0.0"
    }
