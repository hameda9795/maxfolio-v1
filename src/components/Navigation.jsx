import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { aboutAPI, handleAPIError } from '../utils/api';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navData, setNavData] = useState(null);

  // Default nav items (fallback)
  const defaultNavItems = [
    { key: 'home', label: 'Home', href: '#home', order: 1 },
    { key: 'projects', label: 'Projects', href: '#projects', order: 2 },
    { key: 'skills', label: 'Skills', href: '#skills', order: 3 },
    { key: 'about', label: 'About', href: '#about', order: 4 },
    { key: 'contact', label: 'Contact', href: '#contact', order: 5 },
  ];

  const [navItems, setNavItems] = useState(defaultNavItems);

  // Fetch navigation data from backend
  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const response = await aboutAPI.getNavigation();
        const data = response.data.data;
        setNavData(data);

        // Use backend links if available
        if (data?.links && data.links.length > 0) {
          const sortedLinks = [...data.links].sort((a, b) => (a.order || 0) - (b.order || 0));
          setNavItems(sortedLinks.map(link => ({
            key: link.label.toLowerCase(),
            label: link.label,
            href: link.href,
            order: link.order
          })));
        }
      } catch (error) {
        console.error('Failed to fetch navigation:', handleAPIError(error));
        // Keep default nav items
      }
    };

    fetchNavData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide/show based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop/Mobile Navigation Bar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-card shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-custom py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-orbitron font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            {navData?.logo || '<DEV />'}
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="relative text-white font-space font-medium hover:text-electric-blue transition-colors cursor-pointer group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label || t(`nav.${item.key}`)}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-pink"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <motion.button
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-electric-blue rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-electric-blue rounded-full"
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-electric-blue rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-deep-purple md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className="text-4xl font-orbitron font-bold text-white hover:text-electric-blue transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.label || t(`nav.${item.key}`)}
                </motion.a>
              ))}

              {/* Animated Background Elements */}
              <motion.div
                className="absolute top-20 right-20 w-32 h-32 rounded-full bg-electric-blue opacity-10 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-neon-pink opacity-10 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
