"""
Domain Layer - Contact Entity
Business logic and core domain models
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class ContactMessage(BaseModel):
    """Contact form message entity"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    timestamp: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Jane Doe",
                "email": "jane@example.com",
                "subject": "Collaboration Opportunity",
                "message": "I'd love to discuss a potential project collaboration..."
            }
        }

    def __init__(self, **data):
        if 'timestamp' not in data:
            data['timestamp'] = datetime.utcnow()
        super().__init__(**data)
