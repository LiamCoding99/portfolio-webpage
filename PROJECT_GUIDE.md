# 📚 Project Management Guide

Complete guide for adding, updating, and managing projects in your portfolio.

---

## 🎯 Quick Start: Adding a New Project

### Step 1: Prepare Your Project Information

Gather the following information before adding a project:

- **Project Name** (e.g., "Tilted Labs")
- **One-line Tagline** (e.g., "Mental Wellness Web Platform")
- **Description** (2-3 sentences about what it does)
- **Technologies Used** (React, Node.js, Firebase, etc.)
- **Key Highlights** (4-6 bullet points of achievements)
- **Timeline** (start date and end date in YYYY-MM format)
- **GitHub URL** (repository link)
- **Live Demo URL** (deployment, video, or documentation)
- **Category** (web, desktop, mobile, ml, data, etc.)
- **Featured?** (Should it appear on the homepage?)

### Step 2: Add Project to Backend

**File:** `backend/infrastructure/repositories/project_repository.py`

1. Open the file
2. Scroll to the `_initialize_projects()` method
3. Copy this template and fill it in:

```python
Project(
    id="my-project-id",  # lowercase-with-dashes
    title="My Project Name",
    tagline="Brief one-line description",
    description="Detailed description of what the project does and its impact. Keep it concise but informative. Mention the problem solved and key features.",
    technologies=[
        "React",
        "Node.js",
        "Python",
        # Add all technologies used
    ],
    highlights=[
        "First key achievement or feature",
        "Second key achievement or feature",
        "Third key achievement or feature",
        "Fourth key achievement or feature",
        # Add 4-6 highlights
    ],
    start_date="2024-01",
    end_date="2024-06",  # or None for ongoing projects
    github_url="https://github.com/username/repo-name",  # or None if no repo
    live_url="https://your-demo-url.com",  # See "Live URL Options" below
    featured=True,  # True to show on homepage
    category="web",  # web, desktop, mobile, ml, data, etc.
    image_url="/images/projects/project-name.png"  # or None
),
```

4. Add a comma after the previous project
5. Paste your new project above the closing `]`

### Step 3: Restart Backend (if running)

```bash
# Stop the backend (Ctrl+C)
# Start it again
cd backend
uvicorn main:app --reload
```

### Step 4: Verify in Frontend

1. Open http://localhost:3000
2. Scroll to the "Featured Projects" section
3. Your new project should appear automatically!

---

## 🔗 Live URL Options

Choose the appropriate live URL based on your project type:

| Project Type | Live URL Options | Example |
|--------------|------------------|---------|
| **Web App** | Deployment URL | `https://my-app.vercel.app` |
| **Desktop App** | Demo video (YouTube)<br>GitHub releases<br>Documentation | `https://youtube.com/watch?v=demo`<br>`https://github.com/user/repo/releases`<br>`https://github.com/user/repo#readme` |
| **Mobile App** | App Store/Play Store<br>Demo video<br>TestFlight | `https://apps.apple.com/app/id123`<br>`https://youtube.com/watch?v=demo` |
| **Backend API** | Swagger/API docs<br>Postman collection<br>GitHub | `https://api.example.com/docs`<br>`https://documenter.getpostman.com/...` |
| **Data Science** | Jupyter notebook<br>Kaggle notebook<br>Google Colab<br>Presentation | `https://github.com/user/repo/blob/main/notebook.ipynb`<br>`https://kaggle.com/code/...` |
| **Machine Learning** | HuggingFace demo<br>Streamlit app<br>Gradio demo | `https://huggingface.co/spaces/...`<br>`https://share.streamlit.io/...` |

**Pro Tips:**
- ✅ Always provide a live URL when possible
- ✅ For desktop apps, create a 2-3 minute demo video
- ✅ Make sure the URL is publicly accessible
- ❌ Don't leave `live_url=None` unless absolutely necessary

---

## 📋 Field Descriptions

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier (lowercase-with-dashes) | `"tilted-labs"` |
| `title` | string | Project name (display title) | `"Tilted Labs"` |
| `tagline` | string | One-line description (50-70 chars) | `"Mental Wellness Web Platform"` |
| `description` | string | Full description (2-3 sentences) | `"Built an AI-assisted anonymous chat platform..."` |
| `technologies` | list | Array of tech stack items | `["React", "Node.js", "Firebase"]` |
| `highlights` | list | Array of key achievements (4-6 items) | `["Implemented Firebase Auth", "Built real-time chat"]` |
| `start_date` | string | Start date (YYYY-MM format) | `"2024-01"` |
| `category` | string | Project category | `"web"`, `"desktop"`, `"mobile"`, `"ml"`, `"data"` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `end_date` | string or None | End date (YYYY-MM) or None for ongoing | `"2024-06"` or `None` |
| `github_url` | string or None | GitHub repository URL | `"https://github.com/user/repo"` or `None` |
| `live_url` | string or None | Live demo/video/docs URL | `"https://demo.com"` or `None` |
| `image_url` | string or None | Project image path | `"/images/projects/name.png"` or `None` |
| `featured` | boolean | Show on homepage? | `True` or `False` |

---

## 🎨 Material Design Compliance

Your frontend is built with Material Design 3. When adding projects, they will automatically:

✅ **Display consistently** with elevation, shadows, and rounded corners
✅ **Animate on hover** with smooth transitions
✅ **Respond to screen size** (mobile, tablet, desktop)
✅ **Use proper spacing** from the theme (8px grid)
✅ **Show color-coded chips** for technologies
✅ **Include action buttons** (View Code, Live Demo)

**No extra work needed!** The Projects component handles all Material Design styling automatically.

---

## 🏗️ Clean Architecture Compliance

Your backend follows Clean Architecture. Here's how it works:

```
Domain Layer (entities/project.py)
    ↓ Defines the Project entity with validation
Infrastructure Layer (repositories/project_repository.py)
    ↓ Stores and retrieves project data
Application Layer (use_cases/project_use_case.py)
    ↓ Business logic for fetching projects
Presentation Layer (api/routes/projects.py)
    ↓ API endpoints that return JSON
Frontend (React)
    ↓ Displays projects with Material Design
```

**When you add a project:**
1. You only modify the **Infrastructure Layer** (project_repository.py)
2. Everything else works automatically
3. No changes needed to API routes, use cases, or frontend
4. The architecture ensures separation of concerns

---

## ✅ Quality Checklist

Before adding a project, make sure:

- [ ] Project has a unique `id` (lowercase-with-dashes)
- [ ] Title and tagline are clear and concise
- [ ] Description is 2-3 sentences (not too long)
- [ ] Technologies list includes ALL major tools/frameworks
- [ ] Highlights include 4-6 specific achievements (not vague)
- [ ] Dates are in YYYY-MM format
- [ ] GitHub URL is valid and public (or None)
- [ ] Live URL is public and working (or appropriate alternative)
- [ ] Category is one of: web, desktop, mobile, ml, data, etc.
- [ ] Featured is True if you want it on homepage
- [ ] No trailing commas after the last project

---

## 🔧 Common Scenarios

### Scenario 1: Adding a Web App

```python
Project(
    id="my-web-app",
    title="My Web App",
    tagline="E-commerce Platform for Local Businesses",
    description="Built a full-stack e-commerce platform with payment integration, inventory management, and analytics dashboard. Helped 50+ local businesses go online during the pandemic.",
    technologies=[
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Stripe",
        "AWS EC2"
    ],
    highlights=[
        "Implemented Stripe payment integration with webhook handling",
        "Built real-time inventory tracking with PostgreSQL triggers",
        "Deployed on AWS EC2 with auto-scaling configuration",
        "Achieved 99.9% uptime with comprehensive error handling",
        "Processed $100K+ in transactions in first 6 months"
    ],
    start_date="2024-01",
    end_date="2024-08",
    github_url="https://github.com/yourusername/my-web-app",
    live_url="https://my-web-app.vercel.app",
    featured=True,
    category="web",
    image_url="/images/projects/my-web-app.png"
),
```

### Scenario 2: Adding a Desktop App (No Live Deployment)

```python
Project(
    id="inventory-manager",
    title="Inventory Management System",
    tagline="Desktop Application for Warehouse Operations",
    description="Developed a C# desktop application for managing warehouse inventory with barcode scanning, real-time stock updates, and reporting features. Reduced inventory errors by 80%.",
    technologies=[
        "C#",
        ".NET Framework",
        "WPF",
        "SQL Server",
        "Entity Framework",
        "Crystal Reports"
    ],
    highlights=[
        "Integrated USB barcode scanner hardware with C# drivers",
        "Built real-time dashboard with stock levels and alerts",
        "Generated automated reports with Crystal Reports",
        "Implemented role-based access control for security",
        "Reduced manual data entry time by 70%"
    ],
    start_date="2023-09",
    end_date="2024-01",
    github_url="https://github.com/yourusername/inventory-manager",
    live_url="https://youtu.be/your-demo-video-id",  # YouTube demo
    featured=True,
    category="desktop",
    image_url="/images/projects/inventory-manager.png"
),
```

### Scenario 3: Adding an Ongoing Project (No End Date)

```python
Project(
    id="open-source-contribution",
    title="React Query Contributions",
    tagline="Open Source Contributions to TanStack Query",
    description="Active contributor to React Query (TanStack Query), one of the most popular data fetching libraries for React. Contributed bug fixes, documentation improvements, and new features.",
    technologies=[
        "React",
        "TypeScript",
        "Jest",
        "GitHub Actions",
        "Open Source"
    ],
    highlights=[
        "Fixed critical memory leak affecting 10K+ projects",
        "Improved TypeScript types for better developer experience",
        "Authored documentation for new features",
        "Reviewed 50+ pull requests from the community",
        "Maintained 4.8/5.0 code review quality score"
    ],
    start_date="2024-01",
    end_date=None,  # Ongoing project
    github_url="https://github.com/TanStack/query/pulls?q=author:yourusername",
    live_url="https://tanstack.com/query/latest",  # Project website
    featured=True,
    category="web",
    image_url="/images/projects/react-query.png"
),
```

### Scenario 4: Adding a Machine Learning Project

```python
Project(
    id="sentiment-analyzer",
    title="Twitter Sentiment Analysis",
    tagline="Real-time Sentiment Analysis with NLP",
    description="Built a machine learning model to analyze sentiment in real-time tweets using BERT transformer architecture. Achieved 94% accuracy on test dataset and deployed as REST API.",
    technologies=[
        "Python",
        "PyTorch",
        "Transformers (HuggingFace)",
        "FastAPI",
        "Docker",
        "Twitter API",
        "Pandas"
    ],
    highlights=[
        "Fine-tuned BERT model achieving 94% accuracy",
        "Processed 1M+ tweets for training dataset",
        "Deployed model as REST API with FastAPI",
        "Implemented real-time streaming with Twitter API",
        "Visualized sentiment trends with interactive dashboard",
        "Containerized with Docker for easy deployment"
    ],
    start_date="2024-03",
    end_date="2024-07",
    github_url="https://github.com/yourusername/sentiment-analyzer",
    live_url="https://huggingface.co/yourusername/sentiment-analyzer",  # HuggingFace
    featured=True,
    category="ml",
    image_url="/images/projects/sentiment-analyzer.png"
),
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Missing Comma Between Projects

```python
# WRONG - Missing comma
Project(
    id="project-1",
    # ...
)
Project(  # ❌ SyntaxError!
    id="project-2",
    # ...
)

# CORRECT - Add comma
Project(
    id="project-1",
    # ...
),  # ✅ Comma here!
Project(
    id="project-2",
    # ...
)
```

### ❌ Mistake 2: Trailing Comma After Last Project

```python
# WRONG - Trailing comma after last item
return [
    Project(...),
    Project(...),
    Project(...),  # ❌ Remove this comma
]

# CORRECT - No comma after last item
return [
    Project(...),
    Project(...),
    Project(...)  # ✅ No comma
]
```

### ❌ Mistake 3: Invalid Date Format

```python
# WRONG
start_date="January 2024"  # ❌
start_date="01/2024"       # ❌
start_date="2024"          # ❌

# CORRECT
start_date="2024-01"       # ✅
```

### ❌ Mistake 4: Forgetting to Restart Backend

After modifying `project_repository.py`, you MUST restart the backend:

```bash
# Stop backend (Ctrl+C)
# Start again
cd backend
uvicorn main:app --reload
```

### ❌ Mistake 5: Using Same ID for Multiple Projects

```python
# WRONG - Duplicate IDs
Project(id="my-app", ...),
Project(id="my-app", ...),  # ❌ Same ID!

# CORRECT - Unique IDs
Project(id="my-app-v1", ...),
Project(id="my-app-v2", ...),  # ✅ Unique!
```

---

## 🎓 Advanced: Extending the Architecture

### Adding Categories Filter (Future Enhancement)

If you want to filter projects by category (e.g., show only "web" projects):

**Backend:** Add to `project_repository.py`
```python
async def get_by_category(self, category: str) -> List[Project]:
    """Get projects by category"""
    return [p for p in self.projects if p.category == category]
```

**API:** Add to `presentation/api/routes/projects.py`
```python
@router.get("/category/{category}")
async def get_projects_by_category(category: str):
    projects = await project_use_case.get_by_category(category)
    return projects
```

**Frontend:** Update `Projects.js`
```javascript
const [category, setCategory] = useState("all");

const fetchProjects = async () => {
    const url = category === "all"
        ? 'http://localhost:8000/api/v1/projects'
        : `http://localhost:8000/api/v1/projects/category/${category}`;
    const response = await axios.get(url);
    setProjects(response.data);
};
```

---

## 📖 Summary

**Adding a new project is simple:**
1. Copy the template
2. Fill in your project details
3. Add to `project_repository.py`
4. Restart backend
5. Check frontend

**Everything else is automatic:**
- ✅ Material Design styling
- ✅ Responsive layout
- ✅ Animations and hover effects
- ✅ Clean Architecture compliance
- ✅ API endpoints
- ✅ Frontend display

**Your portfolio is future-proof!** Add as many projects as you want—the architecture will scale beautifully.

---

**Questions?** Check the main project documentation: `claude_main_prompt.md`

**Last Updated:** February 13, 2026
