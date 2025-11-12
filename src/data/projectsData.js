// Project data structure and sample projects

export const projectsDetailData = {
  'restaurant-management-app': {
    id: 'project-1',
    title: 'Restaurant Management App',
    slug: 'restaurant-management-app',
    subtitle: 'Complete ordering & kitchen management system',
    category: 'web',
    categoryLabel: 'Web Development',
    year: 2024,
    role: 'Full Stack Developer',
    timeline: '3 months',
    client: 'Restaurant Chain',

    hero: {
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
      video: null,
      alt: 'Restaurant Management Dashboard',
    },

    overview: {
      description: 'Developed a comprehensive restaurant management system that streamlines operations from order taking to kitchen management. The platform provides real-time synchronization across all devices, ensuring orders are never lost and customers receive faster service.',
      challenge: 'The restaurant chain was losing orders, experiencing slow service times, and facing kitchen communication breakdowns due to manual paper-based systems.',
      solution: 'Built a digital ordering system with real-time updates, kitchen display screens, inventory management, and customer-facing digital menus.',
      impact: 'Reduced order processing time by 40%, achieved 99.9% uptime, and now serves 500+ daily users across 5 locations.',
    },

    problemStatement: {
      background: 'A growing restaurant chain with 5 locations was struggling with manual order management. Servers would write orders on paper tickets, leading to illegible handwriting, lost orders, and communication delays with the kitchen.',
      userPainPoints: [
        'Orders frequently lost or misread due to handwriting',
        'Average wait time of 25 minutes from order to service',
        'No visibility into order status for customers',
        'Kitchen staff overwhelmed during peak hours',
        'Inventory tracking done manually with spreadsheets',
      ],
      constraints: [
        'Budget: $50,000',
        'Timeline: 3 months to launch',
        'Must work offline during internet outages',
        'Integration with existing POS system required',
      ],
      beforeImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    },

    myRole: {
      position: 'Lead Full Stack Developer',
      responsibilities: [
        'Architected the entire system from scratch',
        'Developed both frontend (customer & kitchen interfaces) and backend API',
        'Implemented real-time WebSocket connections for live updates',
        'Integrated with Square POS and payment processing',
        'Set up AWS infrastructure and CI/CD pipeline',
        'Conducted user testing with restaurant staff',
      ],
      team: [
        { role: 'Project Manager', name: '1 person' },
        { role: 'UI/UX Designer', name: '1 person' },
        { role: 'Full Stack Developer (Me)', name: '1 person' },
        { role: 'QA Tester', name: '1 person' },
      ],
      skillsDemonstrated: ['System Architecture', 'Real-time Systems', 'React', 'Node.js', 'WebSockets', 'AWS', 'Payment Integration'],
    },

    technologies: {
      frontend: [
        { name: 'React', icon: '⚛️', url: 'https://react.dev' },
        { name: 'Next.js', icon: '▲', url: 'https://nextjs.org' },
        { name: 'Tailwind CSS', icon: '🎨', url: 'https://tailwindcss.com' },
        { name: 'Framer Motion', icon: '✨', url: 'https://www.framer.com/motion' },
      ],
      backend: [
        { name: 'Node.js', icon: '🟢', url: 'https://nodejs.org' },
        { name: 'Express', icon: '🚂', url: 'https://expressjs.com' },
        { name: 'Socket.io', icon: '🔌', url: 'https://socket.io' },
        { name: 'MongoDB', icon: '🍃', url: 'https://www.mongodb.com' },
      ],
      tools: [
        { name: 'Git', icon: '🔧', url: 'https://git-scm.com' },
        { name: 'Docker', icon: '🐳', url: 'https://www.docker.com' },
        { name: 'AWS', icon: '☁️', url: 'https://aws.amazon.com' },
        { name: 'Square POS', icon: '💳', url: 'https://squareup.com' },
      ],
    },

    codeSnippets: [
      {
        title: 'Real-time Order Updates with Socket.io',
        language: 'javascript',
        code: `// Server-side Socket.io implementation
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join room based on restaurant location
  socket.on('join_restaurant', (restaurantId) => {
    socket.join(\`restaurant_\${restaurantId}\`);
  });

  // Emit new orders to kitchen displays
  socket.on('new_order', async (orderData) => {
    const order = await Order.create(orderData);
    io.to(\`restaurant_\${order.restaurantId}\`)
      .emit('order_created', order);
  });

  // Update order status
  socket.on('update_order_status', async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    io.to(\`restaurant_\${order.restaurantId}\`)
      .emit('order_updated', order);
  });
});`,
      },
      {
        title: 'Optimized MongoDB Aggregation Pipeline',
        language: 'javascript',
        code: `// Get daily sales analytics with aggregation
const getDailySalesAnalytics = async (restaurantId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await Order.aggregate([
    {
      $match: {
        restaurantId,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: { $hour: '$createdAt' },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$totalAmount' },
        avgOrderValue: { $avg: '$totalAmount' }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};`,
      },
    ],

    process: {
      timeline: [
        {
          phase: 'Discovery & Research',
          duration: '1 week',
          description: 'Interviewed staff, observed operations during peak hours, analyzed pain points',
          deliverables: ['User research report', 'Requirements document', 'Technical feasibility study'],
        },
        {
          phase: 'Design & Prototyping',
          duration: '2 weeks',
          description: 'Created wireframes, prototypes, and conducted user testing with restaurant staff',
          deliverables: ['Figma designs', 'Interactive prototype', 'Design system'],
        },
        {
          phase: 'Development',
          duration: '7 weeks',
          description: 'Built frontend and backend, integrated POS system, implemented real-time features',
          deliverables: ['MVP release', 'API documentation', 'Admin dashboard'],
        },
        {
          phase: 'Testing & QA',
          duration: '1 week',
          description: 'Conducted stress testing, fixed bugs, optimized performance',
          deliverables: ['Test reports', 'Performance benchmarks', 'Bug fixes'],
        },
        {
          phase: 'Launch & Training',
          duration: '1 week',
          description: 'Deployed to production, trained staff, monitored for issues',
          deliverables: ['Production deployment', 'Training materials', 'Support documentation'],
        },
      ],
    },

    beforeAfter: {
      before: {
        image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop',
        label: 'Before: Manual paper-based system',
      },
      after: {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        label: 'After: Digital management dashboard',
      },
    },

    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        caption: 'Real-time order dashboard with live updates',
        type: 'desktop',
      },
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        caption: 'Kitchen display system showing active orders',
        type: 'desktop',
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop',
        caption: 'Mobile waiter interface for order taking',
        type: 'mobile',
      },
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        caption: 'Analytics dashboard with sales insights',
        type: 'desktop',
      },
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        caption: 'Inventory management interface',
        type: 'desktop',
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop',
        caption: 'Customer-facing digital menu on tablets',
        type: 'mobile',
      },
    ],

    metrics: [
      {
        label: 'Faster Service',
        value: 40,
        suffix: '%',
        description: 'Reduction in order-to-table time',
        icon: '⚡',
      },
      {
        label: 'Uptime',
        value: 99.9,
        suffix: '%',
        description: 'System availability',
        icon: '🟢',
      },
      {
        label: 'Daily Users',
        value: 500,
        suffix: '+',
        description: 'Orders processed per day',
        icon: '👥',
      },
      {
        label: 'Revenue Increase',
        value: 25,
        suffix: '%',
        description: 'Increase in sales due to efficiency',
        icon: '💰',
      },
    ],

    links: {
      demo: 'https://restaurant-demo.vercel.app',
      github: 'https://github.com/yourusername/restaurant-management',
      design: null,
      blog: null,
    },

    learnings: [
      'Real-time systems require careful error handling and reconnection logic',
      'Offline-first architecture is crucial for restaurant environments with unreliable internet',
      'User training and change management are as important as the technology itself',
      'Performance optimization is critical when dealing with high-frequency updates',
      'Working closely with end-users throughout development leads to better products',
    ],

    testimonial: {
      quote: 'This system has transformed our operations. Orders are faster, more accurate, and our staff loves how easy it is to use.',
      author: 'Sarah Johnson',
      role: 'Restaurant Manager',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },

    relatedProjects: ['e-commerce-platform', 'fitness-tracker-app'],
  },

  'e-commerce-platform': {
    id: 'project-2',
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    subtitle: 'Modern shopping experience with AR product preview',
    category: 'web',
    categoryLabel: 'Web Development',
    year: 2024,
    role: 'Frontend Lead',
    timeline: '4 months',
    client: 'Fashion Retailer',

    hero: {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop',
      video: null,
      alt: 'E-commerce Platform',
    },

    overview: {
      description: 'Built a modern e-commerce platform with advanced features including AR product visualization, one-click checkout, and personalized recommendations.',
      challenge: 'High cart abandonment rate (78%) and slow checkout process averaging 4 minutes.',
      solution: 'Implemented optimized UX, streamlined checkout flow, AR product preview, and integrated multiple payment options.',
      impact: '3x increase in conversion rate, reduced checkout time to 45 seconds, 4.9/5 customer satisfaction.',
    },

    problemStatement: {
      background: 'A fashion retailer with 100K+ monthly visitors was struggling with a 78% cart abandonment rate. Their legacy checkout process was slow, confusing, and lacked modern features.',
      userPainPoints: [
        'Checkout required creating an account (friction)',
        'Multi-step checkout took average 4 minutes',
        'No product visualization (high return rates)',
        'Limited payment options',
        'Mobile experience was clunky',
      ],
      constraints: [
        'Must integrate with existing inventory system',
        'Support 50K+ concurrent users',
        'GDPR and PCI DSS compliance required',
        '6-month timeline for full rollout',
      ],
      beforeImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
    },

    myRole: {
      position: 'Frontend Lead & UX Engineer',
      responsibilities: [
        'Led frontend architecture and tech stack selection',
        'Implemented AR product preview using Three.js',
        'Optimized performance (Lighthouse score: 98)',
        'Built component library and design system',
        'Integrated Stripe, PayPal, and Apple Pay',
        'Conducted A/B testing on checkout flows',
      ],
      team: [
        { role: 'Product Manager', name: '1 person' },
        { role: 'UX Designer', name: '2 people' },
        { role: 'Frontend Developers', name: '3 people (including me as lead)' },
        { role: 'Backend Developers', name: '2 people' },
      ],
      skillsDemonstrated: ['React/Next.js', 'Three.js', 'Performance Optimization', 'Payment Integration', 'A/B Testing', 'Team Leadership'],
    },

    technologies: {
      frontend: [
        { name: 'Next.js 14', icon: '▲', url: 'https://nextjs.org' },
        { name: 'React', icon: '⚛️', url: 'https://react.dev' },
        { name: 'TypeScript', icon: '📘', url: 'https://www.typescriptlang.org' },
        { name: 'Tailwind CSS', icon: '🎨', url: 'https://tailwindcss.com' },
        { name: 'Three.js', icon: '🎲', url: 'https://threejs.org' },
      ],
      backend: [
        { name: 'Node.js', icon: '🟢', url: 'https://nodejs.org' },
        { name: 'PostgreSQL', icon: '🐘', url: 'https://www.postgresql.org' },
        { name: 'Redis', icon: '🔴', url: 'https://redis.io' },
      ],
      tools: [
        { name: 'Stripe', icon: '💳', url: 'https://stripe.com' },
        { name: 'Vercel', icon: '▲', url: 'https://vercel.com' },
        { name: 'Figma', icon: '🎯', url: 'https://figma.com' },
        { name: 'Google Analytics', icon: '📊', url: 'https://analytics.google.com' },
      ],
    },

    codeSnippets: [
      {
        title: 'Optimized Image Loading with Next.js',
        language: 'jsx',
        code: `import Image from 'next/image';
import { useState } from 'react';

export function ProductImage({ src, alt, priority = false }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={\`duration-700 ease-in-out \${
          isLoading
            ? 'scale-110 blur-lg grayscale'
            : 'scale-100 blur-0 grayscale-0'
        }\`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}`,
      },
    ],

    process: {
      timeline: [
        {
          phase: 'UX Research & Analysis',
          duration: '2 weeks',
          description: 'Analyzed user behavior, conducted surveys, identified friction points',
          deliverables: ['UX audit report', 'User journey maps', 'Conversion funnel analysis'],
        },
        {
          phase: 'Design & Prototyping',
          duration: '3 weeks',
          description: 'Created high-fidelity designs, built interactive prototypes, A/B test variants',
          deliverables: ['Figma designs', 'Design system', 'Clickable prototypes'],
        },
        {
          phase: 'Development Sprint 1',
          duration: '6 weeks',
          description: 'Built core e-commerce features, product pages, cart, checkout',
          deliverables: ['Product catalog', 'Shopping cart', 'Checkout flow v1'],
        },
        {
          phase: 'Development Sprint 2',
          duration: '4 weeks',
          description: 'Implemented AR preview, payment integrations, performance optimizations',
          deliverables: ['AR product viewer', 'Payment integration', 'Performance report'],
        },
        {
          phase: 'Testing & Launch',
          duration: '3 weeks',
          description: 'QA testing, load testing, gradual rollout, monitoring',
          deliverables: ['Test reports', 'Production deployment', 'Analytics setup'],
        },
      ],
    },

    beforeAfter: {
      before: {
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
        label: 'Before: Legacy checkout with 78% abandonment',
      },
      after: {
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        label: 'After: Streamlined checkout with 26% abandonment',
      },
    },

    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
        caption: 'Homepage with personalized product recommendations',
        type: 'desktop',
      },
      {
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop',
        caption: 'Product detail page with AR preview',
        type: 'desktop',
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop',
        caption: 'Mobile shopping cart experience',
        type: 'mobile',
      },
      {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        caption: 'One-click checkout flow',
        type: 'desktop',
      },
    ],

    metrics: [
      {
        label: 'Conversion Rate',
        value: 3,
        suffix: 'x',
        description: 'Increase in completed purchases',
        icon: '📈',
      },
      {
        label: 'Checkout Time',
        value: 45,
        suffix: 's',
        description: 'Average time to complete purchase',
        icon: '⚡',
      },
      {
        label: 'Performance Score',
        value: 98,
        suffix: '',
        description: 'Lighthouse performance rating',
        icon: '🚀',
      },
      {
        label: 'Customer Satisfaction',
        value: 4.9,
        suffix: '/5',
        description: 'Average customer rating',
        icon: '⭐',
      },
    ],

    links: {
      demo: 'https://ecommerce-demo.vercel.app',
      github: 'https://github.com/yourusername/ecommerce-platform',
      design: 'https://figma.com/file/example',
      blog: null,
    },

    learnings: [
      'Small UX improvements can have massive impact on conversion rates',
      'Performance is a feature - every 100ms delay costs conversions',
      'A/B testing is essential for validating design decisions',
      'Mobile-first approach is non-negotiable for e-commerce',
      'Payment integration complexity should never be underestimated',
    ],

    testimonial: {
      quote: 'Our conversion rate tripled within the first month. The new platform is fast, beautiful, and our customers love it.',
      author: 'Michael Chen',
      role: 'Head of E-commerce',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },

    relatedProjects: ['restaurant-management-app', 'fitness-tracker-app'],
  },

  'fitness-tracker-app': {
    id: 'project-3',
    title: 'Fitness Tracker App',
    slug: 'fitness-tracker-app',
    subtitle: 'Track workouts, nutrition, and progress with AI coaching',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    year: 2023,
    role: 'Mobile Developer',
    timeline: '5 months',
    client: 'Fitness Startup',

    hero: {
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&h=1080&fit=crop',
      video: null,
      alt: 'Fitness Tracker App',
    },

    overview: {
      description: 'Developed a comprehensive fitness tracking mobile app with AI-powered coaching, workout planning, nutrition tracking, and social features.',
      challenge: 'Users needed a single app to track all aspects of fitness journey with personalized guidance.',
      solution: 'Built React Native app with TensorFlow Lite for exercise recognition, nutrition API integration, and real-time coaching.',
      impact: '50K+ downloads in first 3 months, 4.8/5 app store rating, 85% user retention after 30 days.',
    },

    problemStatement: {
      background: 'Fitness enthusiasts were juggling multiple apps for workouts, nutrition, and progress tracking. They wanted an all-in-one solution with intelligent coaching.',
      userPainPoints: [
        'Using 3-5 different apps for fitness needs',
        'No personalized workout recommendations',
        'Manual logging of exercises and meals',
        'Lack of motivation and accountability',
        'No way to connect with friends or community',
      ],
      constraints: [
        'Must work offline for gym environments',
        'Battery efficient (background tracking)',
        'Support iOS and Android simultaneously',
        'Privacy-first approach (GDPR compliant)',
      ],
      beforeImage: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop',
    },

    myRole: {
      position: 'Lead Mobile Developer',
      responsibilities: [
        'Architected React Native app from ground up',
        'Implemented AI exercise recognition using TensorFlow Lite',
        'Built workout planning and tracking features',
        'Integrated nutrition database APIs',
        'Developed real-time sync across devices',
        'Published to App Store and Google Play',
      ],
      team: [
        { role: 'Product Manager', name: '1 person' },
        { role: 'UI/UX Designer', name: '1 person' },
        { role: 'Mobile Developer (Me)', name: '1 person' },
        { role: 'Backend Developer', name: '1 person' },
        { role: 'ML Engineer', name: '1 person' },
      ],
      skillsDemonstrated: ['React Native', 'TensorFlow Lite', 'Mobile Performance', 'API Integration', 'App Store Optimization'],
    },

    technologies: {
      frontend: [
        { name: 'React Native', icon: '📱', url: 'https://reactnative.dev' },
        { name: 'TypeScript', icon: '📘', url: 'https://www.typescriptlang.org' },
        { name: 'Redux Toolkit', icon: '🔄', url: 'https://redux-toolkit.js.org' },
      ],
      backend: [
        { name: 'Node.js', icon: '🟢', url: 'https://nodejs.org' },
        { name: 'MongoDB', icon: '🍃', url: 'https://www.mongodb.com' },
        { name: 'TensorFlow Lite', icon: '🤖', url: 'https://www.tensorflow.org/lite' },
      ],
      tools: [
        { name: 'Expo', icon: '📦', url: 'https://expo.dev' },
        { name: 'Firebase', icon: '🔥', url: 'https://firebase.google.com' },
        { name: 'Nutritionix API', icon: '🥗', url: 'https://www.nutritionix.com' },
      ],
    },

    codeSnippets: [],

    process: {
      timeline: [
        {
          phase: 'User Research',
          duration: '2 weeks',
          description: 'Interviewed fitness enthusiasts, analyzed competitor apps',
          deliverables: ['User personas', 'Feature priority matrix', 'Market analysis'],
        },
        {
          phase: 'Design',
          duration: '3 weeks',
          description: 'Created app flows, wireframes, high-fidelity designs',
          deliverables: ['App wireframes', 'UI designs', 'Design system'],
        },
        {
          phase: 'Development',
          duration: '12 weeks',
          description: 'Built core features, AI integration, testing',
          deliverables: ['MVP app', 'Backend API', 'ML models'],
        },
        {
          phase: 'Beta Testing',
          duration: '3 weeks',
          description: 'TestFlight/Beta release, user feedback, bug fixes',
          deliverables: ['Beta version', 'User feedback report', 'Bug fixes'],
        },
        {
          phase: 'Launch',
          duration: '2 weeks',
          description: 'App Store submission, marketing, monitoring',
          deliverables: ['Production release', 'Marketing materials', 'Analytics'],
        },
      ],
    },

    beforeAfter: {
      before: {
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop',
        label: 'Before: Juggling multiple fitness apps',
      },
      after: {
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
        label: 'After: All-in-one fitness solution',
      },
    },

    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop',
        caption: 'Workout tracking with AI exercise recognition',
        type: 'mobile',
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop',
        caption: 'Nutrition logging with barcode scanner',
        type: 'mobile',
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop',
        caption: 'Progress dashboard with charts and insights',
        type: 'mobile',
      },
      {
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1200&fit=crop',
        caption: 'AI coaching with personalized recommendations',
        type: 'mobile',
      },
    ],

    metrics: [
      {
        label: 'Downloads',
        value: 50,
        suffix: 'K+',
        description: 'In first 3 months',
        icon: '📥',
      },
      {
        label: 'App Rating',
        value: 4.8,
        suffix: '/5',
        description: 'Average user rating',
        icon: '⭐',
      },
      {
        label: 'User Retention',
        value: 85,
        suffix: '%',
        description: 'After 30 days',
        icon: '🔄',
      },
      {
        label: 'Workouts Logged',
        value: 250,
        suffix: 'K+',
        description: 'Total workouts tracked',
        icon: '💪',
      },
    ],

    links: {
      demo: null,
      github: null,
      design: null,
      blog: null,
    },

    learnings: [
      'Mobile performance optimization is critical for battery life',
      'Offline-first architecture essential for gym environments',
      'User onboarding flow makes or breaks app retention',
      'AI features need to be accurate to gain user trust',
      'Community features drive engagement and retention',
    ],

    testimonial: {
      quote: 'This app has completely changed how I approach fitness. The AI coaching keeps me motivated and on track.',
      author: 'Jessica Martinez',
      role: 'App User',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },

    relatedProjects: ['restaurant-management-app', 'e-commerce-platform'],
  },
};

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return projectsDetailData[slug] || null;
};

// Helper function to get all project slugs
export const getAllProjectSlugs = () => {
  return Object.keys(projectsDetailData);
};

// Helper function to get related projects
export const getRelatedProjects = (currentSlug, relatedSlugs) => {
  return relatedSlugs
    .filter(slug => slug !== currentSlug)
    .map(slug => projectsDetailData[slug])
    .filter(Boolean)
    .slice(0, 3);
};
