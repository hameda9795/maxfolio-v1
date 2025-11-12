# Portfolio Admin Dashboard

A professional, modern admin dashboard for managing your portfolio website content.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Admin and Editor roles
- **RESTful API** - Well-structured API endpoints
- **Security** - Rate limiting, CORS, input validation, password hashing
- **Email Service** - Password reset emails with Nodemailer

### Frontend (React + Vite + Tailwind CSS)
- **Modern UI** - Glassmorphism design with gradient accents
- **Responsive** - Works perfectly on all devices
- **Real-time Updates** - Toast notifications for user feedback
- **Rich Features** - Project management, skills management, message handling

## 📦 Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for emails

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- React Hot Toast
- React Hook Form

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email service

### 1. Backend Setup

#### Step 1: Navigate to backend directory
```bash
cd backend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Create environment file
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Email Configuration (Gmail)
EMAIL_USER=hameda9795@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM_NAME=Portfolio Admin

# Admin Credentials (for seeding)
ADMIN_USERNAME=hameda9795
ADMIN_EMAIL=hameda9795@gmail.com
ADMIN_PASSWORD=102067438Gerd.com

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

**Important Notes:**
- Replace `your_mongodb_connection_string` with your MongoDB Atlas URI
- Replace `your_super_secret_jwt_key_here` with a secure random string
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)

#### Step 4: Seed initial admin user
```bash
npm run seed
```

This will create the admin user with credentials from your `.env` file.

#### Step 5: Start the backend server
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

#### Step 1: Navigate to admin-dashboard directory
```bash
cd admin-dashboard
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Create environment file (optional)
Create a `.env` file in the `admin-dashboard` directory:

```env
VITE_API_URL=http://localhost:5000
```

#### Step 4: Start the development server
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📝 Default Admin Credentials

**Username:** `hameda9795`
**Password:** `102067438Gerd.com`
**Email:** `hameda9795@gmail.com`

**⚠️ IMPORTANT:** Change the password after first login!

## 🔑 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Login with username/email and password
```json
{
  "username": "hameda9795",
  "password": "102067438Gerd.com"
}
```

#### POST /api/auth/forgot-password
Request password reset email
```json
{
  "email": "hameda9795@gmail.com"
}
```

#### PUT /api/auth/reset-password/:token
Reset password with token from email
```json
{
  "password": "newPassword123"
}
```

#### GET /api/auth/me
Get current user info (requires authentication)

### Projects Endpoints

#### GET /api/projects
Get all projects (with optional filters)
- Query params: `category`, `featured`, `published`, `search`, `page`, `limit`

#### GET /api/projects/:slug
Get single project by slug

#### POST /api/projects (Protected)
Create new project

#### PUT /api/projects/:id (Protected)
Update project

#### DELETE /api/projects/:id (Protected)
Delete project

#### DELETE /api/projects (Admin Only)
Bulk delete projects
```json
{
  "ids": ["id1", "id2", "id3"]
}
```

### Skills Endpoints

#### GET /api/skills
Get all skills
- Query params: `category`, `featured`, `published`

#### GET /api/skills/:id
Get single skill

#### POST /api/skills (Protected)
Create new skill

#### PUT /api/skills/:id (Protected)
Update skill

#### PUT /api/skills/reorder (Protected)
Reorder skills
```json
{
  "skills": [
    { "id": "skill1", "order": 1 },
    { "id": "skill2", "order": 2 }
  ]
}
```

#### DELETE /api/skills/:id (Protected)
Delete skill

### Messages Endpoints

#### GET /api/messages (Protected)
Get all messages
- Query params: `status`, `isStarred`, `search`, `page`, `limit`

#### GET /api/messages/:id (Protected)
Get single message

#### POST /api/messages (Public)
Create new message (contact form submission)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

#### PUT /api/messages/:id (Protected)
Update message status

#### POST /api/messages/:id/reply (Protected)
Reply to message
```json
{
  "content": "Thank you for reaching out..."
}
```

#### PUT /api/messages/:id/star (Protected)
Toggle star status

#### DELETE /api/messages/:id (Protected)
Delete message

## 🔐 Security Features

1. **Password Hashing** - Bcrypt with salt rounds
2. **JWT Tokens** - Secure authentication tokens
3. **Rate Limiting** - Protection against brute force
4. **CORS** - Controlled cross-origin requests
5. **Helmet.js** - HTTP security headers
6. **Input Validation** - Express-validator for data validation
7. **Role-Based Access** - Admin and Editor permissions

## 📱 Dashboard Features

### Dashboard Overview
- Total projects, skills, unread messages count
- Recent messages list
- Quick action cards
- Activity metrics

### Projects Management
- Create, read, update, delete projects
- Category filtering
- Search functionality
- Featured and published toggles
- Rich project details (hero, overview, tech stack, links)

### Skills Management
- Organize by category (Frontend, Backend, Tools, Design)
- Skill level progress bars
- Years of experience tracking
- Featured skills
- Color customization

### Messages Management
- Filter by status (unread, read, replied, archived)
- Star important messages
- Reply directly from dashboard
- Status management
- Delete messages

### Settings
- Update account password
- View account information
- API configuration info

### User Management (Admin Only)
- Create new users
- Assign roles (Admin/Editor)
- Role-based permissions

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Create a new project
2. Connect your GitHub repository
3. Set environment variables from `.env`
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Create a new project
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Set environment variable: `VITE_API_URL=your_backend_url`
6. Deploy

### Database (MongoDB Atlas)

1. Create a cluster
2. Create a database user
3. Whitelist IP addresses (or allow from anywhere for development)
4. Get connection string
5. Add to backend `.env`

## 🔧 Troubleshooting

### Common Issues

**1. Cannot connect to MongoDB**
- Check MongoDB URI in `.env`
- Ensure IP is whitelisted in MongoDB Atlas
- Verify network connectivity

**2. Email not sending**
- Use Gmail App Password, not regular password
- Enable "Less secure app access" (if using regular Gmail)
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`

**3. CORS errors**
- Ensure FRONTEND_URL in backend `.env` matches your frontend URL
- Check that backend is running

**4. Token expired errors**
- Clear localStorage in browser
- Re-login to get new token

**5. Cannot create admin user**
- Ensure MongoDB is connected
- Check if user already exists
- Verify credentials in `.env`

## 📧 Support

For issues or questions, contact: hameda9795@gmail.com

## 📄 License

MIT License - feel free to use for your own projects!

---

**Built with ❤️ by hameda9795**
