"""
Presentation Layer - Resume Routes
API endpoints for resume download
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os

router = APIRouter()

RESUME_PATH = "static/resumes/Liam_Nguyen_Resume.pdf"


@router.get("/resume/metadata")
async def get_resume_metadata():
    """Get resume metadata"""
    if not os.path.exists(RESUME_PATH):
        return {
            "available": False,
            "filename": "Liam_Nguyen_Resume.pdf",
            "message": "Resume file not uploaded yet"
        }

    file_size = os.path.getsize(RESUME_PATH)
    modified_time = os.path.getmtime(RESUME_PATH)

    return {
        "available": True,
        "filename": "Liam_Nguyen_Resume.pdf",
        "size_kb": round(file_size / 1024, 2),
        "last_updated": modified_time,
        "download_url": "/api/v1/resume/download"
    }


@router.get("/resume/download")
async def download_resume():
    """Download resume PDF"""
    if not os.path.exists(RESUME_PATH):
        raise HTTPException(
            status_code=404,
            detail="Resume file not found. Please contact the site administrator."
        )

    return FileResponse(
        path=RESUME_PATH,
        filename="Liam_Nguyen_Resume.pdf",
        media_type="application/pdf"
    )
