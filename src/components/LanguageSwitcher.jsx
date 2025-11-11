import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'nl' : 'en';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    document.documentElement.lang = newLang;
    localStorage.setItem('language', newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative w-16 h-8 rounded-full glass-card flex items-center justify-between px-1 cursor-pointer overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Switch language"
    >
      {/* Background Slider */}
      <motion.div
        className="absolute top-1 bottom-1 w-6 rounded-full bg-gradient-to-r from-electric-blue to-neon-pink"
        animate={{
          left: currentLang === 'en' ? '4px' : 'calc(100% - 28px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Language Labels */}
      <motion.span
        className={`relative z-10 text-xs font-bold font-space transition-colors duration-300 ${
          currentLang === 'en' ? 'text-deep-purple' : 'text-electric-blue'
        }`}
      >
        EN
      </motion.span>
      <motion.span
        className={`relative z-10 text-xs font-bold font-space transition-colors duration-300 ${
          currentLang === 'nl' ? 'text-deep-purple' : 'text-electric-blue'
        }`}
      >
        NL
      </motion.span>
    </motion.button>
  );
};

export default LanguageSwitcher;
