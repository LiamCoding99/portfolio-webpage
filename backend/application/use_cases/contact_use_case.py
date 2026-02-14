"""
Application Layer - Contact Use Cases
Business rules and application-specific logic
"""
from typing import Dict
from domain.entities.contact import ContactMessage
from infrastructure.email.email_service import EmailService


class ContactUseCase:
    """Use case for handling contact form submissions"""

    def __init__(self, email_service: EmailService):
        self.email_service = email_service

    async def submit_contact_form(self, contact_message: ContactMessage) -> Dict[str, str]:
        """
        Process contact form submission

        Args:
            contact_message: Validated contact message entity

        Returns:
            Dict with status and message
        """
        try:
            # Send email notification
            await self.email_service.send_contact_notification(contact_message)

            return {
                "status": "success",
                "message": "Thank you for your message! I'll get back to you soon."
            }
        except Exception as e:
            # Log error (in production, use proper logging)
            print(f"Error sending contact email: {str(e)}")
            return {
                "status": "error",
                "message": "Failed to send message. Please try again or email directly."
            }
