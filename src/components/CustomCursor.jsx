import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);

    // Add hover effects for different elements
    const addHoverListeners = () => {
      const links = document.querySelectorAll('a, button, .clickable');
      const images = document.querySelectorAll('img');
      const projectCards = document.querySelectorAll('.project-card');

      links.forEach((link) => {
        link.addEventListener('mouseenter', () => setCursorVariant('link'));
        link.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      images.forEach((img) => {
        img.addEventListener('mouseenter', () => setCursorVariant('image'));
        img.addEventListener('mouseleave', () => setCursorVariant('default'));
      });

      projectCards.forEach((card) => {
        card.addEventListener('mouseenter', () => setCursorVariant('project'));
        card.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(addHoverListeners, 500);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      backgroundColor: 'rgba(15, 244, 198, 0.3)',
      border: '2px solid #0FF4C6',
      mixBlendMode: 'difference',
    },
    link: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 0, 110, 0.2)',
      border: '2px solid #FF006E',
      mixBlendMode: 'difference',
    },
    image: {
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      width: 100,
      height: 100,
      backgroundColor: 'rgba(15, 244, 198, 0.1)',
      border: '3px solid #0FF4C6',
      mixBlendMode: 'difference',
    },
    project: {
      x: mousePosition.x - 60,
      y: mousePosition.y - 60,
      width: 120,
      height: 120,
      backgroundColor: 'rgba(255, 0, 110, 0.15)',
      border: '3px solid #FF006E',
      mixBlendMode: 'difference',
    },
  };

  const cursorText = {
    link: 'VIEW',
    project: 'CLICK',
    image: '🔍',
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          mixBlendMode: variants[cursorVariant].mixBlendMode,
        }}
      >
        {cursorText[cursorVariant] && (
          <span className="text-white text-xs font-bold font-space">
            {cursorText[cursorVariant]}
          </span>
        )}
      </motion.div>

      {/* Cursor Trail/Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-2 h-2 bg-electric-blue rounded-full"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
        }}
      />
    </>
  );
};

export default CustomCursor;
