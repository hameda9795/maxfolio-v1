import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const timelineData = [
  {
    id: 1,
    year: '2024',
    type: 'work',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovators Inc.',
    description: 'Leading development of cutting-edge web applications using React, Node.js, and cloud technologies.',
    icon: '💼',
  },
  {
    id: 2,
    year: '2022',
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    description: 'Built scalable web applications and implemented modern CI/CD practices.',
    icon: '🚀',
  },
  {
    id: 3,
    year: '2021',
    type: 'education',
    title: 'Master of Computer Science',
    company: 'University of Technology',
    description: 'Specialized in AI, Machine Learning, and Advanced Web Technologies.',
    icon: '🎓',
  },
  {
    id: 4,
    year: '2020',
    type: 'work',
    title: 'Frontend Developer',
    company: 'Creative Agency',
    description: 'Designed and developed responsive, user-friendly interfaces for diverse clients.',
    icon: '🎨',
  },
  {
    id: 5,
    year: '2018',
    type: 'education',
    title: 'Bachelor of Computer Science',
    company: 'University of Amsterdam',
    description: 'Foundation in software engineering, algorithms, and data structures.',
    icon: '📚',
  },
];

const TimelineItem = ({ item, index, expandedId, setExpandedId }) => {
  const isExpanded = expandedId === item.id;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center gap-8 mb-16 ${
        isEven ? 'flex-row' : 'flex-row-reverse'
      } relative`}
    >
      {/* Content Card */}
      <motion.div
        className={`w-5/12 cursor-pointer ${isEven ? 'text-right' : 'text-left'}`}
        onClick={() => setExpandedId(isExpanded ? null : item.id)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="glass-card p-6 rounded-2xl relative overflow-hidden group clickable"
          whileHover={{
            boxShadow: '0 0 30px rgba(15, 244, 198, 0.3), 0 0 60px rgba(255, 0, 110, 0.2)',
          }}
        >
          {/* Year Badge */}
          <motion.div
            className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r from-electric-blue to-neon-pink text-white font-orbitron font-bold text-sm mb-3 ${
              isEven ? 'float-right' : 'float-left'
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {item.year}
          </motion.div>

          <div className="clear-both">
            <h3 className="text-xl md:text-2xl font-space font-bold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-electric-blue font-inter font-semibold mb-3">
              {item.company}
            </p>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 font-inter text-sm overflow-hidden"
                >
                  {item.description}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Type Badge */}
            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-space ${
                item.type === 'work'
                  ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30'
                  : 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
              }`}
            >
              {item.type === 'work' ? 'Work' : 'Education'}
            </span>
          </div>

          {/* Hover Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue to-neon-pink"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Center Icon */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-neon-pink flex items-center justify-center text-3xl shadow-lg"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {item.icon}
        </motion.div>

        {/* Connecting line */}
        {index < timelineData.length - 1 && (
          <motion.div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-electric-blue to-neon-pink"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          />
        )}
      </motion.div>

      {/* Spacer */}
      <div className="w-5/12" />
    </motion.div>
  );
};

const About = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 rounded-full bg-neon-pink opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-orbitron font-black gradient-text mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto mb-8">
            {t('about.subtitle')}
          </p>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl max-w-4xl mx-auto"
          >
            <p className="text-lg text-gray-200 font-inter leading-relaxed">
              {t('about.bio')}
            </p>
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-center gradient-text mb-16">
            {t('about.experience')}
          </h3>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { number: '50+', label: 'Projects Completed' },
            { number: '6+', label: 'Years Experience' },
            { number: '30+', label: 'Happy Clients' },
            { number: '15+', label: 'Technologies' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <motion.h4
                className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              >
                {stat.number}
              </motion.h4>
              <p className="text-gray-300 font-space font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
