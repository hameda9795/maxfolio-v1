import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { aboutAPI, handleAPIError } from '../utils/api';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState(null);

  // Default data (fallback)
  const defaultQuickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const defaultSocialLinks = [
    { platform: 'GitHub', url: 'https://github.com', icon: '💻' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  ];

  const [quickLinks, setQuickLinks] = useState(defaultQuickLinks);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);

  // Fetch footer data from backend
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await aboutAPI.getFooter();
        const data = response.data.data;
        setFooterData(data);

        if (data?.quickLinks && data.quickLinks.length > 0) {
          setQuickLinks(data.quickLinks);
        }

        if (data?.socialLinks && data.socialLinks.length > 0) {
          setSocialLinks(data.socialLinks);
        }
      } catch (error) {
        console.error('Failed to fetch footer:', handleAPIError(error));
        // Keep default data
      }
    };

    fetchFooterData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-deep-purple border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-electric-blue opacity-5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-neon-pink opacity-5 blur-3xl" />

      <div className="container-custom relative z-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-orbitron font-bold gradient-text mb-4">
              {'<DEV />'}
            </h3>
            <p className="text-gray-400 font-inter leading-relaxed">
              {footerData?.tagline || "Let's create something amazing together"}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-space font-bold text-electric-blue mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={link.href || index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-electric-blue transition-colors font-inter clickable"
                    whileHover={{ x: 5 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-space font-bold text-electric-blue mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.platform || index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-2xl hover:bg-electric-blue/20 transition-colors clickable group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 font-inter text-sm text-center md:text-left"
          >
            {footerData?.copyright || `© ${currentYear} All rights reserved`}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 font-inter text-sm text-center"
          >
            {t('footer.madeWith')} ❤️ {t('footer.and')} ⚛️
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="px-6 py-2 rounded-full glass-card text-electric-blue font-space font-semibold hover:bg-electric-blue/20 transition-colors clickable"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            {t('backToTop')} ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
