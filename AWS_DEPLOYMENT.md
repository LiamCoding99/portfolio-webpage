# ☁️ AWS Deployment Guide

Complete guide for deploying your portfolio to AWS using industry-standard services.

---

## 🎯 Architecture Overview

```
User Browser
    ↓
AWS Amplify (Frontend - React)
    ↓
AWS App Runner (Backend - FastAPI)
    ↓
Amazon SES (Email Service)
```

**Why This Stack?**
- ✅ Production-ready and scalable
- ✅ Industry-standard AWS services
- ✅ Auto-scaling and managed infrastructure
- ✅ Great for your resume (AWS experience)
- ✅ Cost-effective (~$5-10/month with free tier)

---

## 💰 Cost Breakdown

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| **AWS Amplify** | 1000 build minutes/month<br>15 GB data transfer | $0 (within free tier) |
| **AWS App Runner** | None (pay-per-use) | $5-8/month (low traffic) |
| **Amazon SES** | 62,000 emails/month (if in EC2) | $0.10 per 1000 emails |
| **Route 53** (Domain) | $0.50/month per hosted zone | $0.50/month |

**Total Estimated:** $5-10/month (less with free tier)

---

## 📋 Prerequisites

- [x] AWS Account (you already have this!)
- [x] GitHub repository with your code
- [x] Domain name (optional, can use AWS-provided domain)
- [x] Gmail App Password for SMTP

---

## 🚀 Part 1: Deploy Backend (AWS App Runner)

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Portfolio with AWS deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to AWS App Runner

1. **Go to AWS Console**
   - Sign in: https://console.aws.amazon.com
   - Region: Select closest region (e.g., `us-west-2`)

2. **Navigate to App Runner**
   - Services → App Runner
   - Click "Create service"

3. **Configure Source**
   ```
   Repository type: Source code repository
   Connect to GitHub: Authorize AWS to access your GitHub
   Repository: Select your portfolio repository
   Branch: main
   Source directory: /backend          ← IMPORTANT!
   Deployment trigger: Automatic (deploys on push)
   ```

   > **Note:** Source directory MUST be `/backend` since all backend code
   > (`requirements.txt`, `main.py`, etc.) lives in the `backend/` folder.

4. **Build Settings** (Step 2)

   **Important:** Select **"Configure all settings here"** (manual configuration, NOT configuration file).

   ```
   Configuration source: API (Configure all settings here)
   Runtime: Python 3
   Build command: pip3 install -r requirements.txt --target /app/backend/vendor
   Start command: python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
   Port: 8000
   ```

   > **Gotchas we discovered:**
   > - Use `pip3` not `pip` — `pip` is not on the PATH in App Runner's Python runtime
   > - Use `python3 -m uvicorn` not `uvicorn` — same reason, `uvicorn` isn't on the PATH directly
   > - Use `--target /app/backend/vendor` with pip — App Runner uses a multi-stage Docker build where packages installed to system paths are NOT copied to the runtime container. Installing to `/app/backend/vendor` ensures packages persist.
   > - Do NOT use a configuration file (`apprunner.yaml`) — it adds unnecessary complexity and runtime version issues
   > - All Python package directories MUST have `__init__.py` files — without them, imports like `from domain.entities.contact import ContactMessage` will fail on App Runner

5. **Environment Variables** (same step)

   | Source | Name | Value |
   |--------|------|-------|
   | Plain text | `PORT` | `8000` |
   | Plain text | `PYTHONPATH` | `/app/backend/vendor` |

   > **Note:** `PYTHONPATH` is required so Python can find packages installed to the vendor directory.
   >
   > You'll add SMTP/email variables later once the service is running.

6. **Service Settings** (Step 3: Configure Service)
   ```
   Service name: portfolio-backend
   Virtual CPU: 1 vCPU (default)
   Memory: 2 GB (default)
   Auto scaling: Default settings
   Health check: Default (/health endpoint)
   ```

7. **Create Service** (Step 4: Review)
   - Review your settings
   - Click **"Create & deploy"**
   - Wait 5-10 minutes for deployment
   - Copy your App Runner URL (e.g., `https://xxxxx.us-west-2.awsapprunner.com`)

8. **Add Email Environment Variables After Deployment** ⭐ **IMPORTANT**

   Once the service is deployed and running, add email credentials:

   a. **Go to your service** → Click **"Configuration"** tab

   b. **Scroll to "Environment variables"** → Click **"Edit"**

   c. **Add variables with the appropriate source type:**

   **Plain text:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=your-email@gmail.com
   ALLOWED_ORIGINS=https://main.xxxxx.amplifyapp.com
   ```

   **Secrets Manager** (for sensitive credentials):
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password-here
   ```

   d. **Save changes** → App Runner automatically redeploys (2-3 minutes)

   > **Note:** Update `ALLOWED_ORIGINS` after deploying frontend!

### Step 3: Verify Deployment

After environment variables are saved and the service redeploys:

```bash
# Test health endpoint
curl https://your-apprunner-url.awsapprunner.com/health

# Check API docs
# Visit: https://your-apprunner-url.awsapprunner.com/docs
```

**Expected response:**
```json
{
  "status": "healthy",
  "environment": "production"
}
```

---

## 🎨 Part 2: Deploy Frontend (AWS Amplify)

### Step 1: Navigate to AWS Amplify

1. **AWS Console** → Services → **AWS Amplify**
2. Click "**Get started**" under "Amplify Hosting"

### Step 2: Connect Repository

```
1. Select: GitHub
2. Authorize AWS Amplify (if first time)
3. Select repository: your-portfolio
4. Select branch: main
5. Click "Next"
```

### Step 3: Configure Build Settings

AWS auto-detects React, but let's customize:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd frontend
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: frontend/build
    files:
      - '**/*'
  cache:
    paths:
      - frontend/node_modules/**/*
```

**App name:** `portfolio-frontend`

**Environment variables:**
```
REACT_APP_API_URL=https://your-apprunner-url.awsapprunner.com
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX (optional)
```

### Step 4: Advanced Settings (Optional)

```
Build image: Amazon Linux 2023 (recommended)
Service role: Create new role (auto-selected)
```

### Step 5: Deploy

1. Click "**Save and deploy**"
2. Wait 3-5 minutes for build
3. Get your Amplify URL: `https://main.xxxxx.amplifyapp.com`

### Step 6: Update Backend CORS

1. Go back to **App Runner** → Your service
2. Configuration → Environment variables
3. Update `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=https://main.xxxxx.amplifyapp.com
   ```
4. Click "Deploy" to restart with new config

---

## 🔗 Part 3: Connect Everything

### Update Frontend API URL

1. **Amplify Console** → Your app → Environment variables
2. Add/Update:
   ```
   REACT_APP_API_URL=https://your-apprunner-url.awsapprunner.com
   ```
3. Redeploy: Amplify → Latest build → "Redeploy this version"

### Test Full Stack

1. Open your Amplify URL
2. Test contact form (should send email)
3. Check projects load from backend
4. Test resume download

---

## 🌐 Part 4: Custom Domain (Optional)

### Option 1: Use Amplify Domain

1. Amplify Console → Domain management
2. Add domain: `yourdomain.com`
3. Follow DNS verification steps
4. Update App Runner CORS with new domain

### Option 2: Use Route 53 + CloudFront (Advanced)

For more control over DNS and CDN.

---

## 🔒 Part 5: Enhance Security

### 1. Set Up AWS Secrets Manager (Recommended)

Instead of plain environment variables, use AWS Secrets Manager:

```bash
# Install AWS CLI
# https://aws.amazon.com/cli/

# Store email credentials
aws secretsmanager create-secret \
    --name portfolio/smtp-credentials \
    --secret-string '{"username":"your-email@gmail.com","password":"your-app-password"}'
```

Update App Runner to use secrets (requires IAM role configuration).

### 2. Enable AWS WAF (Web Application Firewall)

Protect against common attacks:
- Amplify → App settings → Access control
- Enable WAF rules for DDoS protection

### 3. Set Up Amazon SES (Instead of Gmail)

For production email service:

1. **SES Console** → Verified identities
2. Add email: `liamnguyen224@gmail.com`
3. Verify email (check inbox)
4. Request production access (removes sending limits)
5. Update backend to use SES instead of SMTP

---

## 📊 Part 6: Monitoring & Logging

### AWS CloudWatch

**App Runner Logs:**
```
App Runner → Your service → Logs → View in CloudWatch
```

**Amplify Logs:**
```
Amplify → Your app → Build → View logs
```

**Set Up Alarms:**
```
CloudWatch → Alarms → Create alarm
- Metric: App Runner CPU utilization
- Threshold: > 80%
- Action: Send SNS notification
```

---

## 🚀 Part 7: Auto-Deployment Workflow

### Current Setup (Already Working!)

```
1. Make changes locally
2. git add . && git commit -m "Update"
3. git push origin main
4. ✅ Amplify auto-builds frontend
5. ✅ App Runner auto-deploys backend
6. Done! 🎉
```

### Advanced: Multi-Environment Setup

**Production + Staging:**

```
main branch → Production (Amplify + App Runner)
develop branch → Staging (separate Amplify app)
```

Create separate App Runner services:
- `portfolio-backend-prod` (from main)
- `portfolio-backend-staging` (from develop)

---

## 🎓 Alternative AWS Options

### Option A: AWS Elastic Beanstalk (Backend)

**Pros:** More control, easier debugging
**Cons:** Slightly more expensive

```bash
# Install EB CLI
pip install awsebcli

# Initialize and deploy
cd backend
eb init -p python-3.11 portfolio-backend
eb create portfolio-backend-env
eb deploy
```

### Option B: AWS Lambda + API Gateway (Serverless)

**Pros:** Pay only for requests, infinite scale
**Cons:** Cold starts, more complex

Use AWS SAM or Serverless Framework:
```bash
sam init
sam deploy --guided
```

### Option C: AWS ECS + Fargate (Containers)

**Pros:** Full Docker control, microservices-ready
**Cons:** More expensive, complex setup

Use your existing `Dockerfile`:
```bash
# Build and push to ECR
docker build -t portfolio-backend .
docker tag portfolio-backend:latest <your-ecr-url>
docker push <your-ecr-url>
```

---

## 🛠️ Troubleshooting

### Backend Issues

**Problem:** App Runner build fails
```bash
# Use pip3, not pip (pip is not on the PATH)
# Use python3 -m uvicorn, not uvicorn directly
# Use manual configuration ("Configure all settings here"), not apprunner.yaml
# Ensure Source Directory is set to /backend
# Check requirements.txt for Python 3.11 compatibility
```

**Problem:** `apprunner.yaml not found`
```bash
# App Runner looks for apprunner.yaml at the root of the Source Directory
# Solution: Use manual configuration instead of a config file
# Or ensure Source Directory points to the folder containing apprunner.yaml
```

**Problem:** `pip: command not found` or `uvicorn: executable file not found`
```bash
# App Runner Python runtimes use pip3 and python3, not pip/python
# Build command: pip3 install -r requirements.txt --target /app/backend/vendor
# Start command: python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
```

**Problem:** `No module named uvicorn` (or any package) at runtime
```bash
# App Runner uses multi-stage Docker builds. Packages installed to system
# paths during build are NOT copied to the runtime container.
# Fix: Install with --target to a directory under /app:
#   Build command: pip3 install -r requirements.txt --target /app/backend/vendor
# And set PYTHONPATH environment variable:
#   PYTHONPATH=/app/backend/vendor
```

**Problem:** `ModuleNotFoundError` for your own modules (domain, application, etc.)
```bash
# Ensure every Python package directory has an __init__.py file:
#   backend/domain/__init__.py
#   backend/domain/entities/__init__.py
#   backend/application/__init__.py
#   backend/application/use_cases/__init__.py
#   backend/infrastructure/__init__.py
#   backend/infrastructure/email/__init__.py
#   backend/infrastructure/repositories/__init__.py
#   backend/presentation/__init__.py
#   backend/presentation/api/__init__.py
#   backend/presentation/api/routes/__init__.py
# These can be empty files, but they MUST exist.
```

**Problem:** CORS errors
```bash
# Verify ALLOWED_ORIGINS includes your Amplify URL
# No trailing slashes
# Use https:// not http://
```

### Frontend Issues

**Problem:** Amplify build fails
```bash
# Check build logs in Amplify console
# Verify package.json scripts
# Check Node version compatibility
```

**Problem:** API calls fail (404)
```bash
# Verify REACT_APP_API_URL is set
# Check it matches App Runner URL exactly
# Redeploy after changing env vars
```

---

## 📈 Performance Optimization

### 1. Enable CloudFront for Amplify

Amplify already uses CloudFront, but you can customize:
```
Amplify → App settings → Performance mode
Enable: SPA redirect (for React Router)
```

### 2. App Runner Auto-Scaling

```
App Runner → Your service → Configuration
Auto scaling:
- Min instances: 1
- Max instances: 3
- Concurrency: 100 (requests per instance)
```

### 3. Enable Caching

Update FastAPI to add cache headers:
```python
from fastapi.responses import JSONResponse

@app.get("/api/v1/projects")
async def get_projects():
    # Cache for 1 hour
    return JSONResponse(
        content=projects,
        headers={"Cache-Control": "public, max-age=3600"}
    )
```

---

## 🎯 Post-Deployment Checklist

- [ ] Backend deployed to App Runner
- [ ] Frontend deployed to Amplify
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Custom domain configured (optional)
- [ ] SSL certificates working (auto by AWS)
- [ ] Contact form tested
- [ ] Projects loading from API
- [ ] Resume download working
- [ ] CloudWatch alarms set up
- [ ] Monitoring dashboard configured

---

## 📞 AWS Resources

- **App Runner Docs:** https://docs.aws.amazon.com/apprunner/
- **Amplify Docs:** https://docs.amplify.aws/
- **AWS Free Tier:** https://aws.amazon.com/free/
- **AWS Support:** https://console.aws.amazon.com/support/

---

## 💡 Resume Impact

**Add to your resume:**
```
• Deployed full-stack portfolio using AWS Amplify (React) and AWS App Runner (FastAPI)
• Implemented CI/CD pipeline with automatic deployments from GitHub
• Configured AWS CloudWatch monitoring and alerting
• Optimized application performance with CloudFront CDN
• Managed infrastructure using AWS best practices and security guidelines
```

---

## 🚀 Next Steps

1. **Deploy to AWS** following this guide
2. **Monitor performance** in CloudWatch
3. **Add custom domain** for professional look
4. **Set up SES** for production email
5. **Configure WAF** for security
6. **Create staging environment** for testing

---

**Deployed on:** _[Date]_
**Frontend URL:** _[Your Amplify URL]_
**Backend URL:** _[Your App Runner URL]_
**Status:** ✅ Production Ready

---

**Built with AWS by Liam T. Nguyen**
**Last Updated:** February 14, 2026
