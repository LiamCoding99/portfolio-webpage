"""
Domain Layer - Project Entity
Business logic for project data
"""
from typing import List, Optional
from pydantic import BaseModel, Field, HttpUrl


class Project(BaseModel):
    """Project showcase entity"""
    id: str
    title: str
    tagline: str
    description: str
    technologies: List[str]
    highlights: List[str]
    start_date: str
    end_date: Optional[str] = None
    github_url: Optional[HttpUrl] = None
    live_url: Optional[HttpUrl] = None
    image_url: Optional[str] = None
    featured: bool = False
    category: str  # "web", "desktop", "mobile", etc.

    class Config:
        json_schema_extra = {
            "example": {
                "id": "tilted-labs",
                "title": "Tilted Labs",
                "tagline": "Mental Wellness Web Platform",
                "description": "AI-assisted anonymous chat platform...",
                "technologies": ["React", "Node.js", "Firebase"],
                "highlights": [
                    "Firebase Auth with Google Sign-In",
                    "Real-time chat with Firestore"
                ],
                "start_date": "2024-01",
                "end_date": "2024-06",
                "featured": True,
                "category": "web"
            }
        }
