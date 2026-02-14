"""
Infrastructure Layer - Project Repository
Data access for projects (currently in-memory, can be extended to DB)

HOW TO ADD A NEW PROJECT:
==========================
1. Copy the Project template below and fill in your details
2. Add it to the projects list in _initialize_projects()
3. Make sure to include ALL required fields:
   - id: unique identifier (lowercase-with-dashes)
   - title: Project name
   - tagline: Short description (1 sentence)
   - description: Full description (2-3 sentences)
   - technologies: List of tech stack items
   - highlights: List of key achievements/features (4-6 items)
   - start_date: Format "YYYY-MM"
   - end_date: Format "YYYY-MM" or None for ongoing projects
   - github_url: GitHub repository URL or None
   - live_url: Live demo/video/documentation URL or None
   - featured: True to show on homepage, False to hide
   - category: "web", "desktop", "mobile", "ml", "data", etc.
   - image_url: Path to project image or None

PROJECT TEMPLATE:
-----------------
Project(
    id="my-project-name",
    title="My Project Name",
    tagline="Brief one-line description",
    description="Detailed description of what the project does and its impact. Keep it concise but informative. Mention the problem solved and key features.",
    technologies=[
        "React",
        "Node.js",
        # Add all technologies used
    ],
    highlights=[
        "First key achievement or feature",
        "Second key achievement or feature",
        "Third key achievement or feature",
        "Fourth key achievement or feature",
    ],
    start_date="2024-01",
    end_date="2024-06",  # or None for ongoing
    github_url="https://github.com/username/repo-name",  # or None
    live_url="https://your-demo.com",  # or None
    featured=True,  # True to show on homepage
    category="web",  # web, desktop, mobile, ml, data, etc.
    image_url="/images/projects/project-name.png"  # or None
),

LIVE DEMO URL OPTIONS:
----------------------
For web apps: Direct deployment URL (Vercel, Netlify, etc.)
For desktop apps: YouTube demo video, GitHub releases, or documentation
For mobile apps: App Store/Play Store link or demo video
For backend APIs: Swagger/API documentation URL
For data/ML projects: Jupyter notebook, Kaggle notebook, or presentation
"""
from typing import List, Optional
from domain.entities.project import Project


class ProjectRepository:
    """Repository for project data"""

    def __init__(self):
        # In-memory data store (can be replaced with database)
        self.projects = self._initialize_projects()

    def _initialize_projects(self) -> List[Project]:
        """
        Initialize project data

        IMPORTANT: When adding new projects, follow the template in the docstring above.
        All projects should have a live_url when possible:
        - Web apps: deployment URL
        - Desktop/mobile: demo video or documentation
        - Backend: API docs or GitHub
        """
        return [
            Project(
                id="tilted-labs",
                title="Tilted Labs",
                tagline="Mental Wellness Web Platform",
                description="Built an AI-assisted anonymous chat platform focused on mental wellness. Implemented secure authentication, real-time messaging, and a responsive user interface. The platform provides a safe space for users to discuss mental health topics with AI assistance while maintaining complete anonymity.",
                technologies=[
                    "React",
                    "Node.js",
                    "Firebase",
                    "Firestore",
                    "Firebase Auth",
                    "Tailwind CSS",
                    "React Hooks"
                ],
                highlights=[
                    "Implemented Firebase Authentication with Google Sign-In",
                    "Built real-time chat functionality using Firestore",
                    "Designed responsive UI with Tailwind CSS and React Hooks",
                    "Deployed on Firebase Hosting with CI/CD pipeline",
                    "Integrated Firebase Storage for media handling",
                    "Ensured data privacy and user anonymity"
                ],
                start_date="2024-01",
                end_date="2024-06",
                github_url="https://github.com/liamnguyen/tilted-labs",
                live_url="https://tilted-labs.web.app",
                featured=True,
                category="web",
                image_url="/images/projects/tilted-labs.png"
            ),
            Project(
                id="spacecraft-mission-control",
                title="Spacecraft Mission Control System",
                tagline="Java Desktop Application with MySQL",
                description="Developed a comprehensive desktop application for managing spacecraft missions and crew task assignments. Features include mission scheduling, crew management, task tracking, and detailed reporting. Built with a focus on data integrity and efficient database operations.",
                technologies=[
                    "Java",
                    "MySQL",
                    "JDBC",
                    "AWS RDS",
                    "Swing (GUI)",
                    "SQL"
                ],
                highlights=[
                    "Designed normalized SQL schema with proper relationships",
                    "Implemented JDBC operations for database connectivity",
                    "Deployed on AWS RDS for cloud-based data management",
                    "Created SQL triggers for data integrity enforcement",
                    "Built intuitive desktop GUI for mission management",
                    "Managed crew task scheduling and tracking system"
                ],
                start_date="2023-08",
                end_date="2023-12",
                github_url="https://github.com/liamnguyen/spacecraft-mission-control",
                # For desktop apps, use: demo video, GitHub releases, or documentation
                live_url="https://github.com/liamnguyen/spacecraft-mission-control/releases",
                featured=True,
                category="desktop",
                image_url="/images/projects/spacecraft.png"
            )
        ]

    async def get_all(self) -> List[Project]:
        """Get all projects"""
        return self.projects

    async def get_by_id(self, project_id: str) -> Optional[Project]:
        """Get project by ID"""
        for project in self.projects:
            if project.id == project_id:
                return project
        return None

    async def get_featured(self) -> List[Project]:
        """Get featured projects only"""
        return [p for p in self.projects if p.featured]
