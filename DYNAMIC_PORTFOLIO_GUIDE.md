# 🎯 راهنمای Portfolio Dynamic

تبریک می‌گویم! portfolio شما حالا به طور کامل به backend متصل شده و تمام محتوای وبسایت از طریق **Admin Dashboard** قابل مدیریت است.

---

## ✅ چه چیزهایی Dynamic شد؟

### 🎨 **Hero Section (صفحه اصلی)**
- **نام** (Name)
- **عنوان** (Title - مثل "Full Stack Developer")
- **توضیحات** (Description)
- **متن دکمه CTA** (Call to Action Text)

### 📂 **Projects Section**
- **تمام پروژه‌ها** از دیتابیس لود می‌شوند
- **فیلتر بر اساس دسته‌بندی** (Web, Mobile, Design, 3D)
- **جستجو** در عنوان و توضیحات
- **تصاویر، لینک‌ها، تکنولوژی‌ها** همه dynamic
- فقط پروژه‌های **Published** نمایش داده می‌شوند

### 🌟 **Skills Section**
- **تمام مهارت‌ها** از دیتابیس لود می‌شوند
- **دسته‌بندی** به Frontend, Backend, Tools, Design
- **سطح مهارت** (Progress bar)
- **سال‌های تجربه**
- **رنگ و آیکون** قابل تنظیم

### 📧 **Contact Form**
- **پیام‌ها** مستقیماً به دیتابیس ذخیره می‌شوند
- **ایمیل تاییدیه** به کاربر ارسال می‌شود
- **موضوع پیام** (Subject) اضافه شد
- پیام‌ها در **Admin Dashboard** قابل مشاهده و پاسخ‌دهی هستند

---

## 🚀 نحوه استفاده

### 1️⃣ **راه‌اندازی Backend**

```bash
# رفتن به پوشه backend
cd backend

# نصب dependencies (اگر هنوز نصب نکرده‌اید)
npm install

# ایجاد کاربر admin اولیه
npm run seed

# اجرای سرور
npm run dev
```

**Backend روی پورت 5000 اجرا می‌شود:** `http://localhost:5000`

### 2️⃣ **راه‌اندازی Admin Dashboard**

```bash
# رفتن به پوشه admin dashboard
cd admin-dashboard

# نصب dependencies (اگر هنوز نصب نکرده‌اید)
npm install

# اجرای dashboard
npm run dev
```

**Admin Dashboard روی پورت 3000 اجرا می‌شود:** `http://localhost:3000`

**ورود به dashboard:**
- Username: `hameda9795`
- Password: `102067438Gerd.com`

### 3️⃣ **راه‌اندازی Portfolio Frontend**

```bash
# رفتن به پوشه اصلی
cd /home/user/maxfolio-v1

# نصب dependencies (اگر لازم است)
npm install

# اجرای portfolio
npm run dev
```

**Portfolio روی پورت 5173 اجرا می‌شود:** `http://localhost:5173`

---

## 🎛️ مدیریت محتوا از Dashboard

### **📊 Dashboard Overview**
- مشاهده تعداد پروژه‌ها، مهارت‌ها، پیام‌های خوانده نشده
- نمایش آخرین پیام‌ها
- دسترسی سریع به بخش‌های مختلف

### **📁 Projects Management**
1. از منوی سمت چپ روی **Projects** کلیک کنید
2. برای **افزودن پروژه جدید**: دکمه "New Project" → فرم را پر کنید → "Create Project"
3. برای **ویرایش پروژه**: روی دکمه "Edit" کلیک کنید
4. برای **حذف پروژه**: روی دکمه Delete کلیک کنید

**فیلدهای مهم:**
- **Title** و **Subtitle**: عنوان پروژه
- **Category**: Web, Mobile, Design, 3D
- **Hero Image URL**: لینک تصویر پروژه
- **Links**: لینک Live Demo, GitHub, Figma
- **Published**: فعال = نمایش در سایت / غیرفعال = مخفی
- **Featured**: نمایش در بخش Featured Projects

### **⭐ Skills Management**
1. از منوی سمت چپ روی **Skills** کلیک کنید
2. برای **افزودن مهارت جدید**: دکمه "Add Skill"
3. **Category** را انتخاب کنید (Frontend, Backend, Tools, Design)
4. **Level** را تنظیم کنید (0 تا 100)
5. **Years** = سال‌های تجربه
6. **Color** = رنگ مهارت در سایت

### **💬 Messages Management**
1. از منوی سمت چپ روی **Messages** کلیک کنید
2. **فیلتر** پیام‌ها: Unread, Read, Replied, Archived
3. برای **پاسخ**: روی پیام کلیک کنید → قسمت Reply را پر کنید → "Send Reply"
4. **ستاره** = علامت‌گذاری پیام مهم
5. **حذف** پیام: دکمه Delete

### **⚙️ Settings**
1. تغییر **رمز عبور** admin
2. مشاهده **اطلاعات حساب کاربری**
3. مشاهده **API URLs**

---

## 🗄️ ساختار دیتابیس

### **About Collection** (محتوای صفحه اصلی)
```javascript
{
  hero: {
    name: "Hameda Developer",
    title: "Full Stack Developer",
    description: "...",
    ctaText: "View My Work"
  },
  navigation: {
    logo: "Portfolio",
    links: [...]
  },
  footer: {
    tagline: "...",
    copyright: "...",
    socialLinks: [...]
  },
  contact: {
    email: "hameda9795@gmail.com",
    phone: "...",
    location: "..."
  }
}
```

### **Projects Collection**
```javascript
{
  title: "Project Title",
  slug: "project-slug",
  subtitle: "Short description",
  category: "web",  // web, mobile, design, 3d
  year: 2024,
  hero: {
    image: "https://...",
    alt: "Project image"
  },
  technologies: {
    frontend: ["React", "Tailwind"],
    backend: ["Node.js", "MongoDB"],
    tools: ["Git", "Docker"]
  },
  links: {
    live: "https://...",
    github: "https://...",
    figma: "https://..."
  },
  published: true,  // true = نمایش / false = مخفی
  featured: false
}
```

### **Skills Collection**
```javascript
{
  name: "React",
  category: "frontend",  // frontend, backend, tools, design
  level: 95,  // 0 to 100
  years: 5,
  icon: "⚛️",
  color: "#0FF4C6",
  featured: true,
  published: true
}
```

### **Messages Collection**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  subject: "Project Inquiry",
  message: "Hello...",
  status: "unread",  // unread, read, replied, archived
  isStarred: false,
  createdAt: "2024-...",
  reply: {
    content: "Thank you...",
    sentAt: "2024-...",
    sentBy: "admin_id"
  }
}
```

---

## 🔧 تنظیمات پیشرفته

### **MongoDB Configuration**
فایل `backend/.env`:
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/portfolio
```

**برای MongoDB Atlas:**
1. به [MongoDB Atlas](https://cloud.mongodb.com) بروید
2. یک cluster رایگان بسازید
3. دیتابیس User بسازید
4. IP را whitelist کنید
5. Connection String را کپی کنید و در `.env` قرار دهید

### **Email Configuration**
برای ارسال ایمیل تاییدیه:
```env
EMAIL_USER=hameda9795@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**ساخت Gmail App Password:**
1. به Google Account Settings بروید
2. Security → 2-Step Verification را فعال کنید
3. App Passwords → یک password جدید بسازید
4. پسورد را در `.env` قرار دهید

### **API Environment Variables**

**Backend** (`backend/.env`):
```env
PORT=5000
FRONTEND_URL=http://localhost:5173,http://localhost:3000
```

**Frontend** (ریشه پروژه، اختیاری):
```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Endpoints

### **About Endpoints**
- `GET /api/about` - دریافت تمام محتوای About
- `GET /api/about/hero` - دریافت Hero section
- `GET /api/about/navigation` - دریافت Navigation
- `GET /api/about/footer` - دریافت Footer
- `PUT /api/about` - آپدیت محتوا (Protected)
- `POST /api/about/seed` - ایجاد محتوای پیش‌فرض (Admin Only)

### **Projects Endpoints**
- `GET /api/projects` - دریافت لیست پروژه‌ها
- `GET /api/projects/:slug` - دریافت یک پروژه با slug
- `POST /api/projects` - ایجاد پروژه جدید (Protected)
- `PUT /api/projects/:id` - آپدیت پروژه (Protected)
- `DELETE /api/projects/:id` - حذف پروژه (Protected)

### **Skills Endpoints**
- `GET /api/skills` - دریافت لیست مهارت‌ها
- `GET /api/skills/:id` - دریافت یک مهارت
- `POST /api/skills` - ایجاد مهارت جدید (Protected)
- `PUT /api/skills/:id` - آپدیت مهارت (Protected)
- `DELETE /api/skills/:id` - حذف مهارت (Protected)
- `PUT /api/skills/reorder` - مرتب‌سازی مهارت‌ها (Protected)

### **Messages Endpoints**
- `GET /api/messages` - دریافت لیست پیام‌ها (Protected)
- `GET /api/messages/:id` - دریافت یک پیام (Protected)
- `POST /api/messages` - ارسال پیام جدید (Public)
- `PUT /api/messages/:id` - آپدیت وضعیت پیام (Protected)
- `POST /api/messages/:id/reply` - پاسخ به پیام (Protected)
- `PUT /api/messages/:id/star` - ستاره‌دار کردن پیام (Protected)
- `DELETE /api/messages/:id` - حذف پیام (Protected)

---

## 🐛 عیب‌یابی

### **مشکل: Portfolio محتوا نشان نمی‌دهد**
**راه‌حل:**
1. بررسی کنید backend اجرا شده باشد: `http://localhost:5000/api/health`
2. بررسی کنید MongoDB متصل باشد
3. Console browser را چک کنید (F12) برای خطاهای CORS
4. اطمینان حاصل کنید محتوای About در دیتابیس وجود دارد: `POST /api/about/seed`

### **مشکل: CORS Error**
**راه‌حل:**
```env
# در backend/.env
FRONTEND_URL=http://localhost:5173,http://localhost:3000
```
بعد backend را restart کنید.

### **مشکل: پروژه‌ها نمایش داده نمی‌شوند**
**راه‌حل:**
1. در Admin Dashboard پروژه‌ای اضافه کنید
2. مطمئن شوید `published: true` است
3. بررسی کنید Hero Image URL معتبر باشد

### **مشکل: ایمیل ارسال نمی‌شود**
**راه‌حل:**
1. Gmail App Password درست تنظیم شده باشد
2. 2-Step Verification فعال باشد
3. Console backend را چک کنید برای خطاها

---

## 🎉 نتیجه

حالا شما یک **Portfolio کاملاً Dynamic** دارید که:

✅ **همه چیز** از Admin Dashboard قابل مدیریت است
✅ **هیچ کد hard-coded ای** وجود ندارد
✅ **Real-time** محتوا آپدیت می‌شود
✅ **Contact form** با کاربران ارتباط برقرار می‌کند
✅ **Professional** و **Production-ready** است

---

## 📚 منابع بیشتر

- [Admin Dashboard Guide](./ADMIN_DASHBOARD_README.md) - راهنمای کامل Admin Dashboard
- [Project Detail Guide](./PROJECT_DETAIL_DOCS.md) - راهنمای صفحات جزئیات پروژه
- [Backend API Docs](./ADMIN_DASHBOARD_GUIDE.md) - مستندات کامل API

---

**موفق باشید! 🚀**

اگر سوالی دارید یا مشکلی پیش آمد، در Issues گیتهاب یا از طریق Contact Form پرسش کنید.
