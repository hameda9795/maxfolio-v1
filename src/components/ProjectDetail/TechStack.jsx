import { useState } from 'react';
import { motion } from 'framer-motion';

const TechItem = ({ tech, index }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.a
        href={tech.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 rounded-xl glass-card hover:bg-white/10 transition-all clickable group"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-3xl">{tech.icon}</span>
        <span className="text-white font-space font-medium group-hover:text-electric-blue transition-colors">
          {tech.name}
        </span>
        <svg
          className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </motion.a>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-deep-purple border border-electric-blue/30 whitespace-nowrap pointer-events-none"
        >
          <p className="text-electric-blue font-inter text-sm font-medium">
            Click to learn more
          </p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-electric-blue/30" />
        </motion.div>
      )}
    </motion.div>
  );
};

const TechStack = ({ technologies }) => {
  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-4">
          Technologies & Tools
        </h3>
        <p className="text-gray-300 font-inter text-lg">
          The tech stack that powered this project
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Frontend */}
        {technologies.frontend && technologies.frontend.length > 0 && (
          <div>
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-space font-bold text-electric-blue mb-4 flex items-center gap-2"
            >
              <span>⚛️</span>
              Frontend
            </motion.h4>
            <div className="space-y-3">
              {technologies.frontend.map((tech, index) => (
                <TechItem key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Backend */}
        {technologies.backend && technologies.backend.length > 0 && (
          <div>
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl font-space font-bold text-neon-pink mb-4 flex items-center gap-2"
            >
              <span>🔧</span>
              Backend
            </motion.h4>
            <div className="space-y-3">
              {technologies.backend.map((tech, index) => (
                <TechItem key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Tools & Services */}
        {technologies.tools && technologies.tools.length > 0 && (
          <div>
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl font-space font-bold text-electric-blue mb-4 flex items-center gap-2"
            >
              <span>🛠️</span>
              Tools & Services
            </motion.h4>
            <div className="space-y-3">
              {technologies.tools.map((tech, index) => (
                <TechItem key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
