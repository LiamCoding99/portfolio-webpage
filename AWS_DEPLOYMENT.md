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
   Deployment trigger: Automatic (deploys on push)
   ```

4. **Build Settings**
   ```
   Configuration file: Use configuration file
   File location: backend/apprunner.yaml
   ```

   OR manually configure:
   ```
   Build command: pip install -r requirements.txt
   Start command: uvicorn main:app --host 0.0.0.0 --port 8000
   Port: 8000
   ```

5. **Service Settings**
   ```
   Service name: portfolio-backend
   Virtual CPU: 1 vCPU (default)
   Memory: 2 GB (default)
   ```

6. **Environment Variables**

   Click "Add environment variable" for each:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-gmail-app-password-here
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=your-email@gmail.com
   ALLOWED_ORIGINS=https://main.xxxxx.amplifyapp.com
   ```

   > **Note:** Update `ALLOWED_ORIGINS` after deploying frontend!

7. **Create Service**
   - Click "Next" → "Next" → "Create & deploy"
   - Wait 5-10 minutes for deployment
   - Copy your App Runner URL (e.g., `https://xxxxx.us-west-2.awsapprunner.com`)

### Step 3: Test Backend

```bash
# Test health endpoint
curl https://your-apprunner-url.awsapprunner.com/health

# Check API docs
# Visit: https://your-apprunner-url.awsapprunner.com/docs
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
# Check requirements.txt compatibility
# Ensure Python 3.11 compatible
# Check apprunner.yaml syntax
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
**Last Updated:** February 13, 2026
