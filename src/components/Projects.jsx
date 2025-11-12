import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projectsAPI, handleAPIError } from '../utils/api';
import VanillaTilt from 'vanilla-tilt';

const ProjectCard = ({ project, index }) => {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.02,
      });
    }

    return () => {
      if (cardRef.current?.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  const sizeClasses = {
    small: 'col-span-1 row-span-1 h-80',
    medium: 'col-span-1 md:col-span-2 row-span-1 h-80',
    large: 'col-span-1 md:col-span-2 row-span-2 h-[40rem]',
  };

  // Wrap card in Link if slug exists
  const CardWrapper = project.slug ? Link : 'div';
  const wrapperProps = project.slug ? { to: `/project/${project.slug}` } : {};

  return (
    <CardWrapper {...wrapperProps} className="block">
      <motion.div
        ref={cardRef}
        className={`project-card relative rounded-3xl overflow-hidden glass-card cursor-pointer group ${
          sizeClasses[project.size]
        }`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src={project.hero?.image || project.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'}
          alt={project.hero?.alt || project.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-purple via-deep-purple/50 to-transparent" />
      </div>

      {/* Category Tag */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-4 py-2 rounded-full text-xs font-space font-bold bg-gradient-to-r from-electric-blue to-neon-pink text-white shadow-lg">
          {t(`projects.filter.${project.category}`)}
        </span>
      </div>

      {/* Content Overlay */}
      <motion.div
        className="absolute inset-0 p-6 flex flex-col justify-end z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-300 font-inter mb-4 line-clamp-2">
          {project.subtitle || project.description || project.overview?.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.technologies?.frontend || project.tech || []).slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-space rounded-full bg-white/10 backdrop-blur-sm text-electric-blue border border-electric-blue/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.links?.live && (
            <a
              href={project.links.live}
              className="px-6 py-2 rounded-full bg-electric-blue text-deep-purple font-space font-semibold hover:bg-neon-pink hover:text-white transition-colors clickable"
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('projects.liveDemo')}
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              className="px-6 py-2 rounded-full border-2 border-electric-blue text-electric-blue font-space font-semibold hover:bg-electric-blue hover:text-deep-purple transition-colors clickable"
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('projects.sourceCode')}
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-transparent"
        animate={{
          borderColor: isHovered
            ? ['#0FF4C6', '#FF006E', '#0FF4C6']
            : 'transparent',
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
    </CardWrapper>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = ['all', 'web', 'mobile', 'design', '3d'];

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll({
          published: true,
          ...(filter !== 'all' && { category: filter }),
          ...(searchQuery && { search: searchQuery })
        });
        setProjects(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch projects:', handleAPIError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filter, searchQuery]);

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-neon-pink opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-electric-blue opacity-10 blur-3xl" />

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
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder={t('projects.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md mx-auto block px-6 py-4 rounded-full glass-card text-white placeholder-gray-400 font-inter focus:outline-none focus:ring-2 focus:ring-electric-blue"
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-full font-space font-semibold transition-all clickable ${
                filter === filterOption
                  ? 'bg-gradient-to-r from-electric-blue to-neon-pink text-white shadow-lg'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`projects.filter.${filterOption}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter + searchQuery}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-400 font-space">
              No projects found matching your criteria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
