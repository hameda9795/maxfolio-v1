import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lenis from 'lenis';

// Components
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();
  const [lenisInstance, setLenisInstance] = useState(null);

  // Initialize smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Easter Egg: Konami Code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKonamiCode = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Trigger special animation
          document.body.style.animation = 'rainbow 2s linear infinite';
          setTimeout(() => {
            document.body.style.animation = '';
          }, 5000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKonamiCode);
    return () => window.removeEventListener('keydown', handleKonamiCode);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-dark-bg">
          <div className="loader" />
        </div>
      }
    >
      <div className="relative overflow-x-hidden">
        {/* Preloader */}
        <Preloader />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[60] no-print">
          <div
            className="h-full bg-gradient-to-r from-electric-blue to-neon-pink transition-all duration-150"
            style={{
              width: '0%',
              transition: 'width 0.1s ease-out',
            }}
            id="scroll-progress"
          />
        </div>
      </div>

      {/* Global Styles for Easter Eggs */}
      <style>{`
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </Suspense>
  );
}

// Add scroll progress tracking
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollProgress.style.width = `${scrollPercentage}%`;
    }
  });
}

export default App;
