import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { createParticleSystem } from '../animations/threeScene';
import gsap from 'gsap';

const Hero = () => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const [cleanup, setCleanup] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanupFn = createParticleSystem(canvasRef.current);
      setCleanup(() => cleanupFn);
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    // Split text animation for title
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      const letters = text.split('');
      titleRef.current.innerHTML = '';

      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.display = 'inline-block';
        span.className = 'letter';
        titleRef.current.appendChild(span);

        gsap.from(span, {
          opacity: 0,
          y: 50,
          rotation: Math.random() * 20 - 10,
          duration: 0.8,
          delay: index * 0.05,
          ease: 'back.out(1.7)',
        });
      });
    }
  }, [t]);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas Background */}
      <div
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1A0B2E 0%, #0A0414 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-electric-blue font-space text-lg md:text-xl font-medium">
            {t('hero.greeting')}
          </span>
        </motion.div>

        {/* Name with Glitch Effect */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 relative inline-block"
        >
          <span
            className="glitch font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-glow"
            data-text={t('hero.name')}
          >
            {t('hero.name')}
          </span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-space font-bold mb-6 gradient-text"
        >
          {t('hero.title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-inter"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToProjects}
          className="neon-button clickable"
        >
          {t('hero.cta')}
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer clickable"
            onClick={scrollToProjects}
          >
            <span className="text-electric-blue text-sm font-space font-medium">
              {t('hero.scrollHint')}
            </span>
            <svg
              className="w-6 h-6 text-electric-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-electric-blue opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-neon-pink opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};

export default Hero;
