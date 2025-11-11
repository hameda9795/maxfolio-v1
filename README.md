# 🚀 Advanced Portfolio Website

A visually stunning, interactive portfolio website built with React, Three.js, and modern web technologies. Features futuristic design, 3D elements, advanced animations, and bilingual support (English/Dutch).

![Portfolio Preview](https://via.placeholder.com/1200x630/1A0B2E/0FF4C6?text=Advanced+Portfolio)

## ✨ Features

### 🎨 Design & Visual Effects
- **Futuristic Theme**: Dark theme with deep purple (#1A0B2E) and electric blue (#0FF4C6)
- **Glassmorphism & Neumorphism**: Modern UI design patterns
- **Custom Cursor**: Interactive cursor that changes based on hover context
- **Smooth Animations**: GSAP and Framer Motion for buttery-smooth transitions
- **Scroll Progress Indicator**: Visual feedback for page scroll position
- **Particle System**: Three.js powered cosmic background

### 🌐 Internationalization
- **Bilingual Support**: English and Dutch (Nederlands)
- **Language Switcher**: Animated toggle in the navigation
- **Persistent Preference**: Language choice saved to localStorage
- **SEO Optimized**: Proper hreflang tags and language meta data

### 🎯 Interactive Components

#### Hero Section
- 3D rotating geometric shapes
- Interactive particle system
- Mouse-responsive parallax effects
- Glitch effect on name
- Split-text animations

#### Projects Section
- Bento Grid layout (asymmetric card sizes)
- 3D tilt effects on hover
- Category filtering
- Search functionality
- Glassmorphic overlays

#### Skills Section
- Interactive 3D skill cards
- Category-based filtering
- Animated progress bars
- Floating 3D elements

#### About/Timeline
- Vertical scroll-triggered timeline
- Expandable milestone cards
- Animated statistics
- Work/Education differentiation

#### Contact Section
- Real-time form validation
- Animated input fields
- Confetti on successful submission
- Social media links

### 🎪 Easter Eggs
- **Konami Code**: Try entering ↑ ↑ ↓ ↓ ← → ← → B A
- **Custom Cursor Effects**: Different states for different elements
- **Smooth Scroll**: Lenis-powered buttery smooth scrolling

## 🛠️ Technology Stack

### Core
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### 3D & Animation
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **GSAP** - Professional-grade animation library
- **Framer Motion** - React animation library
- **Vanilla Tilt** - 3D tilt effect library
- **Lenis** - Smooth scroll library

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next
- **i18next-http-backend** - Backend plugin for loading translations
- **i18next-browser-languagedetector** - Language detection plugin

### Other Libraries
- **canvas-confetti** - Confetti animations
- **prismjs** - Syntax highlighting (ready to use)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd maxfolio-v1
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🎨 Customization

### 1. Personal Information

Update the following files with your information:

**`public/locales/en/translation.json`** and **`public/locales/nl/translation.json`**
```json
{
  "hero": {
    "name": "Your Name",
    "title": "Your Title",
    // ...
  }
}
```

**`index.html`**
- Update meta tags (title, description, author)
- Update Open Graph and Twitter Card images
- Update JSON-LD structured data
- Replace social media links

### 2. Projects Data

Edit **`src/components/Projects.jsx`**:
```javascript
const projectsData = [
  {
    id: 1,
    title: 'Your Project Name',
    category: 'web', // web, mobile, design, 3d
    description: 'Project description',
    image: 'path-to-image.jpg',
    tech: ['React', 'Node.js'],
    size: 'large', // small, medium, large
    demo: 'https://demo-link.com',
    code: 'https://github.com/...',
  },
  // Add more projects...
];
```

### 3. Skills Data

Edit **`src/components/Skills.jsx`**:
```javascript
const skillsData = {
  frontend: [
    { name: 'React', level: 95, icon: '⚛️' },
    // Add your skills...
  ],
  // ...
};
```

### 4. Timeline/Experience

Edit **`src/components/About.jsx`**:
```javascript
const timelineData = [
  {
    id: 1,
    year: '2024',
    type: 'work', // or 'education'
    title: 'Your Position',
    company: 'Company Name',
    description: 'Description...',
    icon: '💼',
  },
  // Add more experiences...
];
```

### 5. Contact Information

Edit **`src/components/Contact.jsx`** and **`src/components/Footer.jsx`**:
- Update email address
- Update phone number
- Update social media links

### 6. Theme Colors

Edit **`tailwind.config.js`**:
```javascript
colors: {
  'deep-purple': '#1A0B2E',    // Primary dark background
  'electric-blue': '#0FF4C6',   // Primary accent
  'neon-pink': '#FF006E',       // Secondary accent
  'dark-bg': '#0A0414',         // Darkest background
}
```

## 🏗️ Build & Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed)
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

Follow the prompts to link your project and deploy.

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will auto-detect Vite and configure build settings
4. Click "Deploy"

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Or connect your Git repository for continuous deployment

### Deploy to GitHub Pages

1. **Install gh-pages**
```bash
npm install -D gh-pages
```

2. **Add to `package.json`**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

3. **Update `vite.config.js`**
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

4. **Deploy**
```bash
npm run deploy
```

## 📁 Project Structure

```
maxfolio-v1/
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       └── nl/
│           └── translation.json
├── src/
│   ├── animations/
│   │   └── threeScene.js
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── Navigation.jsx
│   │   ├── Preloader.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── i18n/
│   │   └── config.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎯 Performance Optimization

### Already Implemented
- ✅ Code splitting with React.lazy (ready to implement)
- ✅ Optimized Three.js scene (reduced polygons)
- ✅ Smooth scroll with Lenis
- ✅ CSS animations with GPU acceleration
- ✅ Reduced motion support for accessibility
- ✅ Lazy loading images (via Unsplash URLs)

### Recommendations
- Use WebP images with fallbacks
- Implement service worker for offline support
- Add image optimization in build process
- Use CDN for static assets

## ♿ Accessibility

- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus states on all clickable elements
- ✅ Semantic HTML5 elements
- ✅ Screen reader friendly
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ Reduced motion support

## 🔍 SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ Language alternatives (hreflang)
- ✅ Semantic HTML
- ✅ Accessibility features

## 🐛 Troubleshooting

### Issue: Custom cursor not showing
**Solution**: Make sure you're not using a touchscreen device. The custom cursor is disabled on mobile for better UX.

### Issue: Three.js scene not loading
**Solution**: Check browser console for WebGL errors. Some older browsers don't support WebGL.

### Issue: Translations not loading
**Solution**: Ensure translation files are in `public/locales/` and the dev server is running.

### Issue: Build fails
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Your Name**
- Website: [yourportfolio.com](https://yourportfolio.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

---

**Built with ❤️ using React, Three.js, and modern web technologies**
