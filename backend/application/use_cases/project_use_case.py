"""
Application Layer - Project Use Cases
Business logic for project data retrieval
"""
from typing import List, Optional
from domain.entities.project import Project
from infrastructure.repositories.project_repository import ProjectRepository


class ProjectUseCase:
    """Use case for project data operations"""

    def __init__(self, project_repository: ProjectRepository):
        self.repository = project_repository

    async def get_all_projects(self) -> List[Project]:
        """Retrieve all projects"""
        return await self.repository.get_all()

    async def get_project_by_id(self, project_id: str) -> Optional[Project]:
        """Retrieve specific project by ID"""
        return await self.repository.get_by_id(project_id)

    async def get_featured_projects(self) -> List[Project]:
        """Retrieve only featured projects"""
        return await self.repository.get_featured()
