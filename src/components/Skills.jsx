import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { skillsAPI, handleAPIError } from '../utils/api';

const SkillCard = ({ skill, index, category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        z: 50,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative preserve-3d cursor-pointer"
    >
      <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-neon-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: isHovered
              ? [
                  'linear-gradient(135deg, rgba(15, 244, 198, 0.2) 0%, rgba(255, 0, 110, 0.2) 100%)',
                  'linear-gradient(135deg, rgba(255, 0, 110, 0.2) 0%, rgba(15, 244, 198, 0.2) 100%)',
                ]
              : 'linear-gradient(135deg, rgba(15, 244, 198, 0) 0%, rgba(255, 0, 110, 0) 100%)',
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Icon */}
        <motion.div
          className="text-5xl mb-4 relative z-10"
          animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          {skill.icon}
        </motion.div>

        {/* Skill Name */}
        <h3 className="text-xl font-space font-bold text-white mb-3 relative z-10">
          {skill.name}
        </h3>

        {/* Progress Bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric-blue to-neon-pink rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          />
        </div>

        {/* Level Percentage */}
        <motion.div
          className="text-right text-sm font-space font-semibold text-electric-blue relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 1 }}
        >
          {skill.level}%
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: '0 0 20px rgba(15, 244, 198, 0.5), 0 0 40px rgba(255, 0, 110, 0.3)',
          }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [skills, setSkills] = useState([]);
  const [skillsData, setSkillsData] = useState({
    frontend: [],
    backend: [],
    tools: [],
    design: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll({ published: true });
        const fetchedSkills = response.data.data || [];

        // Organize skills by category
        const organized = {
          frontend: [],
          backend: [],
          tools: [],
          design: [],
        };

        fetchedSkills.forEach((skill) => {
          if (organized[skill.category]) {
            organized[skill.category].push(skill);
          }
        });

        setSkillsData(organized);
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Failed to fetch skills:', handleAPIError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = Object.keys(skillsData);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-electric-blue opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-neon-pink opacity-10 blur-3xl animate-float" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-orbitron font-black gradient-text mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-full font-space font-bold text-lg transition-all clickable relative overflow-hidden ${
                activeCategory === category
                  ? 'text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-electric-blue to-neon-pink rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {t(`skills.categories.${category}`)}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective"
        >
          {skillsData[activeCategory].map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              category={activeCategory}
            />
          ))}
        </motion.div>

        {/* 3D Floating Elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          style={{ zIndex: -1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 border-2 border-electric-blue/20 rounded-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
