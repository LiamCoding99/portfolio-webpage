"""
Infrastructure Layer - Email Service
External service for sending emails
"""
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from domain.entities.contact import ContactMessage


class EmailService:
    """Service for sending emails via SMTP"""

    def __init__(self):
        self.smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.smtp_user = os.getenv("SMTP_USER")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.email_from = os.getenv("EMAIL_FROM")
        self.email_to = os.getenv("EMAIL_TO")

    async def send_contact_notification(self, contact: ContactMessage) -> None:
        """
        Send email notification for contact form submission

        Args:
            contact: ContactMessage entity
        """
        print(f"📧 Attempting to send email...")
        print(f"   SMTP Host: {self.smtp_host}")
        print(f"   SMTP Port: {self.smtp_port}")
        print(f"   SMTP User: {self.smtp_user}")
        print(f"   Email To: {self.email_to}")
        print(f"   Password Set: {'Yes' if self.smtp_password else 'No'}")

        if not all([self.smtp_user, self.smtp_password, self.email_to]):
            print("⚠️  Email configuration incomplete. Skipping email send.")
            print(f"   Missing: smtp_user={bool(self.smtp_user)}, password={bool(self.smtp_password)}, email_to={bool(self.email_to)}")
            return

        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Portfolio Contact: {contact.subject}"
        msg['From'] = self.email_from
        msg['To'] = self.email_to
        msg['Reply-To'] = contact.email

        # Email body
        html = f"""
        <html>
            <body style="font-family: Arial, sans-serif;">
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Subject:</strong> {contact.subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>{contact.message}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">
                    Sent at: {contact.timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}
                </p>
            </body>
        </html>
        """

        msg.attach(MIMEText(html, 'html'))

        # Send email
        try:
            print("🔌 Connecting to SMTP server...")
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                print("🔐 Starting TLS...")
                server.starttls()
                print("👤 Logging in...")
                server.login(self.smtp_user, self.smtp_password)
                print("📤 Sending message...")
                server.send_message(msg)
            print(f"✅ Contact email sent successfully from {contact.name}")
        except smtplib.SMTPAuthenticationError as e:
            print(f"❌ SMTP Authentication Failed: {str(e)}")
            print("   Check your SMTP_USER and SMTP_PASSWORD in .env")
            raise
        except smtplib.SMTPException as e:
            print(f"❌ SMTP Error: {str(e)}")
            raise
        except Exception as e:
            print(f"❌ Failed to send email: {type(e).__name__}: {str(e)}")
            raise
