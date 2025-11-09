# Online-Courses-Project - StudyVerse

A comprehensive, production-ready online learning platform featuring a modern single-page application with Docker support, authentication system, and admin dashboard.

## 🚀 Features

### User-Facing Features
- **Responsive Design**: Mobile-first, works seamlessly on all devices
- **Interactive Video Previews**: YouTube video integration with modal player for each course
- **Course Categories**: Organized into Web Development, Data Science & AI, Mobile Development, and Cloud & DevOps
- **Real Course Data**: 6 featured courses with actual pricing (₹999 - ₹2,199), durations, and review counts
- **Newsletter Subscription**: Functional email signup form with confirmation messages
- **Wishlist Functionality**: Add courses to wishlist with localStorage persistence
- **Shopping Cart**: Cart icon with notifications for future checkout integration
- **Smooth Animations**: Professional hover effects and transitions throughout

### Authentication System
- **User & Admin Roles**: Separate login flows with role-based access control
- **Session Management**: Remember me option with localStorage/sessionStorage
- **Protected Routes**: Admin dashboard requires admin credentials
- **Demo Credentials Displayed**: Easy testing with provided credentials on login page

### Admin Dashboard
- **Real-Time Statistics**: 
  - 2,547 Total Courses (+18% growth)
  - 52,847 Active Students (+24% growth)
  - ₹8,45,890 Revenue (+32% growth)
  - 4.9/5.0 Average Rating
- **Course Management**: 
  - **Full CRUD Operations**: Edit existing courses or add new ones directly from the dashboard
  - **Course Editor Modal**: Interactive form with fields for name, category, price, students, status, duration, rating, reviews, image, description, and video URL
  - **localStorage Persistence**: Course data saved to browser storage for demo purposes
  - **Live Table Updates**: Changes instantly reflected in the course management table
  - **Delete Functionality**: Remove courses with confirmation prompts
- **User Management**: User list with role badges and enrollment tracking
- **Analytics Dashboard**:
  - Category popularity chart (Web Dev: 92%, Data Science: 78%, etc.)
  - Recent activity feed with timestamps
  - 5 activity types tracked
- **Professional UI**: Modern design with cards, tables, and color-coded badges

### Technical Features
- **Docker Support**: Dockerfile and docker-compose for containerized deployment
- **Nginx Configuration**: Optimized static file serving with gzip compression
- **Jenkins Pipeline**: CI/CD setup for automated builds and deployments
- **Smoke Testing**: Automated health checks via curl
- **Git-Ready**: .dockerignore for clean image builds

## 📋 Project Structure

```
docker-online-course/
├── courses.html          # Main landing page
├── login.html           # Authentication page
├── admin-dashboard.html # Admin panel
├── style.css            # Main styles
├── login.css            # Login page styles
├── admin.css            # Admin dashboard styles
├── script.js            # Main JavaScript (newsletter, wishlist, videos)
├── auth.js              # Authentication logic
├── admin.js             # Dashboard interactions
├── Dockerfile           # Container build instructions
├── docker-compose.yml   # Multi-container setup
├── nginx.conf           # Web server configuration
├── Jenkinsfile          # CI/CD pipeline
├── smoke-test.sh        # Automated testing script
└── README.md            # This file
```

## 🎯 Demo Credentials

### User Account
- **Username**: `user`
- **Password**: `user123`
- **Access**: Browse courses, view content, add to wishlist

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full dashboard with analytics, course/user management

## 🚀 Quick Start

### Option 1: Local Development (Python)
```bash
# Serve on port 8000
python3 -m http.server 8000 --directory .

# Open in browser
open http://localhost:8000/courses.html
```

### Option 2: Docker (Recommended)
```bash
# Build and run with Docker
docker build -t online-courses:latest .
docker run --rm -p 8080:80 online-courses:latest

# Access the application
open http://localhost:8080/
```

### Option 3: Docker Compose
```bash
# Start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

## 🧪 Testing

Run the automated smoke test:
```bash
# Make executable (first time only)
chmod +x smoke-test.sh

# Test against local server
./smoke-test.sh http://localhost:8000/courses.html

# Test against Docker container
./smoke-test.sh http://localhost:8080/
```

## 📊 Key Metrics & Data

- **Courses**: 2,500+ available across 4 major categories
- **Students**: 50,000+ active learners
- **Instructors**: 500+ expert teachers
- **Success Rate**: 98% course completion
- **Revenue**: ₹8.45 Lakhs monthly
- **Rating**: 4.9/5.0 average across all courses

## 🎓 Featured Courses

1. **HTML & CSS Bootcamp** - ₹999 (12.5 hrs, 2,847 reviews)
2. **Advanced CSS & Sass** - ₹1,299 (18.75 hrs, 1,956 reviews)
3. **JavaScript Complete Guide** - ₹1,499 (24.3 hrs, 3,542 reviews)
4. **Python Data Science & ML** - ₹1,799 (32.25 hrs, 4,128 reviews)
5. **React Complete Guide** - ₹1,599 (28.67 hrs, 5,234 reviews)
6. **Full Stack Node.js** - ₹2,199 (36.83 hrs, 3,867 reviews)

## 🔧 Configuration

### Nginx
- Serves from `/usr/share/nginx/html`
- Default index: `courses.html`
- Gzip compression enabled for CSS/JS/SVG
- Custom routes for `/login` and `/admin-dashboard`

### Docker
- Base image: `nginx:alpine` (lightweight)
- Exposed port: 80
- Volume mounts for development (docker-compose)
- Excludes: node_modules, .git, .md files

## 📱 Pages Overview

- **`/courses.html`** - Main landing page with all courses
- **`/login.html`** - User/Admin authentication
- **`/admin-dashboard.html`** - Admin analytics & management

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Boxicons
- **Fonts**: Google Fonts (Philosopher, Metal Mania, Smythe)
- **Server**: Nginx
- **Container**: Docker
- **CI/CD**: Jenkins
- **Version Control**: Git

## 📈 Admin Dashboard Features

### Statistics Cards
- Total courses with growth percentage
- Active students with monthly increase
- Revenue tracking with trends
- Average rating across platform

### Management Tables
- **Courses**: View, edit, delete courses with status badges
- **Users**: Manage user accounts with role assignment

### Analytics
- Category popularity visualization
- Recent activity timeline
- Real-time updates

## 🌐 Contact Information

- **Location**: Mumbai, Maharashtra, India
- **Email**: support@studyverse.com
- **Phone**: +91 98765 43210
- **Careers**: careers@studyverse.com

## 🔗 Social Links

- Facebook: Connected
- Instagram: Connected
- Twitter: Connected  
- LinkedIn: Connected

## 📝 Notes

- Project is static frontend (no backend database)
- Authentication uses client-side JavaScript (demo purposes)
- For production, implement server-side auth and API
- All course data and statistics are realistic but static
- Newsletter signup shows confirmation but doesn't send emails
- Wishlist stores data in localStorage
- **Course editor saves data to localStorage** - changes persist across browser sessions but are client-side only

## 🎓 Using the Course Editor (Admin)

### Editing Existing Courses
1. Login with admin credentials (admin/admin123)
2. Navigate to "Courses Management" section
3. Click the edit icon (✏️) next to any course
4. Modify the course details in the modal form:
   - Basic Info: Name, Category, Price, Status
   - Engagement: Student count, Duration (hours)
   - Quality Metrics: Rating (1-5), Reviews count
   - Media: Image URL, Video preview URL
   - Content: Description text
5. Click "Save Course" to update
6. Changes appear instantly in the table and are saved to localStorage

### Adding New Courses
1. Click "Add New Course" button in Courses Management
2. Fill in all course details
3. Click "Save Course" to create
4. Note: Currently saves to localStorage (client-side demo)

### Data Persistence
- Course edits are stored in browser's localStorage under key `coursesData`
- Data persists across page reloads
- Each course is stored by its ID number (1-6 for default courses)
- For production, replace localStorage with backend API calls

## 🚢 Deployment

### Jenkins Pipeline
The included Jenkinsfile automates:
1. Clone repository from GitHub
2. Build Docker image
3. Login to Docker Hub
4. Stop old containers
5. Run new container on port 5001

### Manual Deployment
```bash
# Build
docker build -t yourusername/online-course:latest .

# Push to registry
docker login
docker push yourusername/online-course:latest

# Deploy
docker run -d -p 80:80 --name online-course yourusername/online-course:latest
```

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

© 2025 Marri Venkata Siva Naga Yaswanth. All rights reserved.

## 🎯 Future Enhancements

- Backend API integration
- Real payment processing
- Course progress tracking
- Live video streaming
- Discussion forums
- Mobile apps (iOS/Android)
- AI-powered recommendations

---

**Built with ❤️ for the future of online education**

