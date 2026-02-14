# Deployment Guide

Complete guide for deploying your portfolio website.

## Frontend Deployment (Vercel)

### 1. Prerequisites

- GitHub account
- Vercel account (free tier available)
- Push your code to GitHub

### 2. Deploy to Vercel

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Environment Variables**

   ```
   REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain (e.g., `liamnguyen.dev`)
   - Update DNS records as instructed

---

## Backend Deployment (Railway)

### 1. Prerequisites

- GitHub account
- Railway account (free tier available)

### 2. Deploy to Railway

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Service**
   - Root Directory: `backend`
   - Builder: Dockerfile

3. **Environment Variables**
   Add these in Railway's Variables tab:

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=liam@example.com
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Get your public URL: `https://your-backend.up.railway.app`

5. **Update Frontend**
   - Go back to Vercel
   - Update `REACT_APP_API_URL` with your Railway backend URL
   - Redeploy frontend

---

## Alternative: Backend on Render

### Deploy to Render

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure**
   - Name: `liam-nguyen-portfolio-api`
   - Root Directory: `backend`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables**
   Same as Railway (see above)

4. **Deploy**
   - Click "Create Web Service"
   - Get your URL: `https://your-backend.onrender.com`

---

## Post-Deployment Checklist

### Frontend (Vercel)

- [ ] Site is live and accessible
- [ ] All sections load correctly
- [ ] Contact form submits successfully
- [ ] Projects display with correct URLs
- [ ] Google Analytics is tracking (check in GA dashboard)
- [ ] SEO meta tags are correct (view page source)
- [ ] Custom domain configured (if applicable)

### Backend (Railway/Render)

- [ ] API is accessible at `/` and `/health`
- [ ] CORS allows requests from frontend domain
- [ ] Contact form emails are being sent
- [ ] Projects API returns data (`/api/v1/projects`)
- [ ] Resume download works (`/api/v1/resume/download`)

### Testing

1. **Test Contact Form**
   - Submit a test message
   - Check if email arrives at `liamnguyen224@gmail.com`

2. **Test Project Links**
   - Click "View Code" and "Live Demo" buttons
   - Verify they open correctly

3. **Test Resume Download**
   - Upload your resume PDF to `backend/static/resumes/Liam_Nguyen_Resume.pdf`
   - Redeploy backend
   - Test download button

4. **Test Mobile Responsiveness**
   - Open site on mobile device
   - Verify all sections are readable
   - Test navigation menu

---

## Updating Your Site

### Update Content

1. Make changes locally
2. Commit to GitHub: `git add . && git commit -m "Update content"`
3. Push: `git push`
4. Vercel and Railway will auto-deploy

### Update Resume

1. Replace `backend/static/resumes/Liam_Nguyen_Resume.pdf`
2. Commit and push to GitHub
3. Backend will redeploy automatically

---

## Monitoring

### Google Analytics

- View traffic: [analytics.google.com](https://analytics.google.com)
- Track page views, user behavior, and conversions

### Uptime Monitoring

Consider using:

- [UptimeRobot](https://uptimerobot.com) (free)
- [Pingdom](https://www.pingdom.com)

---

## Troubleshooting

### Contact Form Not Working

1. Check backend logs in Railway/Render
2. Verify SMTP credentials are correct
3. Ensure Gmail App Password is valid
4. Check CORS settings allow frontend domain

### API Not Accessible

1. Verify backend is deployed and running
2. Check environment variables are set
3. Ensure `ALLOWED_ORIGINS` includes frontend URL
4. Test API directly: `https://your-backend.railway.app/health`

### Images Not Loading

1. Add images to `frontend/public/images/projects/`
2. Update project `image_url` in backend
3. Redeploy both frontend and backend

---

## Cost Estimate

### Free Tier (Recommended for Portfolio)

- **Vercel**: Free (100 GB bandwidth/month)
- **Railway**: $5/month credit (enough for small API)
- **Render**: Free tier available (spins down after inactivity)

### Paid Tier (If Needed)

- **Vercel Pro**: $20/month
- **Railway**: Pay as you go ($0.000463/GB-hour)
- **Render**: $7/month (always-on)

---

## Support

For issues or questions:

- Check backend logs in Railway/Render dashboard
- Check browser console for frontend errors
- Test API endpoints directly with Postman/Insomnia
- Review deployment documentation:
  - [Vercel Docs](https://vercel.com/docs)
  - [Railway Docs](https://docs.railway.app)
  - [Render Docs](https://render.com/docs)

Good luck with your deployment! 🚀
