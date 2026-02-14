"""
Presentation Layer - Contact Routes
API endpoints for contact functionality
"""
from fastapi import APIRouter, HTTPException
from domain.entities.contact import ContactMessage
from application.use_cases.contact_use_case import ContactUseCase
from infrastructure.email.email_service import EmailService

router = APIRouter()

# Dependency injection
email_service = EmailService()
contact_use_case = ContactUseCase(email_service)


@router.post("/contact")
async def submit_contact_form(contact: ContactMessage):
    """
    Submit contact form

    Request body:
    - name: Full name (2-100 characters)
    - email: Valid email address
    - subject: Message subject (3-200 characters)
    - message: Message content (10-2000 characters)
    """
    try:
        result = await contact_use_case.submit_contact_form(contact)

        if result["status"] == "error":
            raise HTTPException(status_code=500, detail=result["message"])

        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later."
        )
