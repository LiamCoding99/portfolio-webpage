"""
Presentation Layer - Projects Routes
API endpoints for project data
"""
from fastapi import APIRouter, HTTPException
from typing import List
from domain.entities.project import Project
from application.use_cases.project_use_case import ProjectUseCase
from infrastructure.repositories.project_repository import ProjectRepository

router = APIRouter()

# Dependency injection
project_repository = ProjectRepository()
project_use_case = ProjectUseCase(project_repository)


@router.get("/projects", response_model=List[Project])
async def get_all_projects():
    """Get all projects"""
    return await project_use_case.get_all_projects()


@router.get("/projects/featured", response_model=List[Project])
async def get_featured_projects():
    """Get featured projects only"""
    return await project_use_case.get_featured_projects()


@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get specific project by ID"""
    project = await project_use_case.get_project_by_id(project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project
