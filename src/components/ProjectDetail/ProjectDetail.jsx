import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getProjectBySlug, getRelatedProjects } from '../../data/projectsData';

// Sub-components
import BeforeAfterSlider from './BeforeAfterSlider';
import ImageGallery from './ImageGallery';
import TechStack from './TechStack';
import MetricsSection from './MetricsSection';
import CodeSnippets from './CodeSnippets';
import RelatedProjects from './RelatedProjects';

const ProjectDetail = ({ slug }) => {
  const { t } = useTranslation();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const projectData = getProjectBySlug(slug);
    if (projectData) {
      setProject(projectData);
      const related = getRelatedProjects(slug, projectData.relatedProjects || []);
      setRelatedProjects(related);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    // Track scroll position for sidebar navigation
    const handleScroll = () => {
      const sections = ['overview', 'challenge', 'solution', 'tech', 'results', 'learnings'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.hero.image}
            alt={project.hero.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/80 via-deep-purple/90 to-dark-bg" />
        </div>

        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-electric-blue opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container-custom px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-3 rounded-full text-sm font-space font-bold bg-gradient-to-r from-electric-blue to-neon-pink text-white shadow-lg">
                {project.categoryLabel}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-black text-white mb-6"
            >
              {project.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 font-inter mb-12 max-w-3xl mx-auto"
            >
              {project.subtitle}
            </motion.p>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              <div className="text-center">
                <p className="text-electric-blue font-space font-bold text-sm mb-1">
                  CLIENT
                </p>
                <p className="text-white font-inter text-lg">{project.client}</p>
              </div>
              <div className="text-center">
                <p className="text-electric-blue font-space font-bold text-sm mb-1">
                  YEAR
                </p>
                <p className="text-white font-inter text-lg">{project.year}</p>
              </div>
              <div className="text-center">
                <p className="text-electric-blue font-space font-bold text-sm mb-1">
                  ROLE
                </p>
                <p className="text-white font-inter text-lg">{project.role}</p>
              </div>
              <div className="text-center">
                <p className="text-electric-blue font-space font-bold text-sm mb-1">
                  TIMELINE
                </p>
                <p className="text-white font-inter text-lg">{project.timeline}</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            {(project.links.demo || project.links.github) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-button clickable flex items-center gap-2"
                  >
                    <span>Live Demo</span>
                    <svg
                      className="w-5 h-5"
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
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full font-space font-semibold text-lg border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-deep-purple transition-colors clickable flex items-center gap-2"
                  >
                    <span>View Code</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 cursor-pointer clickable"
              onClick={() => scrollToSection('overview')}
            >
              <span className="text-electric-blue text-sm font-space font-medium">
                Scroll to explore
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
      </section>

      {/* Main Content */}
      <div className="relative">
        {/* Sticky Sidebar Navigation (Desktop) */}
        <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
          <nav className="glass-card p-4 rounded-2xl space-y-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'challenge', label: 'Challenge' },
              { id: 'solution', label: 'Solution' },
              { id: 'tech', label: 'Tech Stack' },
              { id: 'results', label: 'Results' },
              { id: 'learnings', label: 'Learnings' },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg font-space text-sm transition-all clickable ${
                  activeSection === section.id
                    ? 'bg-electric-blue text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="container-custom px-4 py-16">
          {/* Overview Section */}
          <section id="overview" className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-8">
                Project Overview
              </h2>
              <p className="text-gray-300 font-inter text-lg md:text-xl leading-relaxed mb-12">
                {project.overview.description}
              </p>

              {/* Overview Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-space font-bold text-electric-blue mb-2">
                    Challenge
                  </h3>
                  <p className="text-gray-300 font-inter">
                    {project.overview.challenge}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-space font-bold text-neon-pink mb-2">
                    Solution
                  </h3>
                  <p className="text-gray-300 font-inter">
                    {project.overview.solution}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-space font-bold text-electric-blue mb-2">
                    Impact
                  </h3>
                  <p className="text-gray-300 font-inter">
                    {project.overview.impact}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Challenge/Problem Section */}
          <section id="challenge" className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-8">
                The Challenge
              </h2>

              {/* Background Context */}
              <div className="glass-card p-8 rounded-3xl mb-8 border-l-4 border-neon-pink">
                <h3 className="text-2xl font-space font-bold text-white mb-4">
                  Background
                </h3>
                <p className="text-gray-300 font-inter text-lg leading-relaxed">
                  {project.problemStatement.background}
                </p>
              </div>

              {/* User Pain Points */}
              <div className="mb-8">
                <h3 className="text-2xl font-space font-bold text-white mb-6">
                  User Pain Points
                </h3>
                <div className="space-y-4">
                  {project.problemStatement.userPainPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-neon-pink/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-neon-pink font-bold">!</span>
                      </div>
                      <p className="text-gray-300 font-inter text-lg">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div>
                <h3 className="text-2xl font-space font-bold text-white mb-6">
                  Constraints & Requirements
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.problemStatement.constraints.map((constraint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-4 rounded-xl flex items-center gap-3"
                    >
                      <span className="text-2xl">⚠️</span>
                      <p className="text-gray-300 font-inter">{constraint}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* My Role Section */}
          <section id="role" className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-8">
                My Role & Responsibilities
              </h2>

              <div className="glass-card p-8 rounded-3xl mb-8">
                <h3 className="text-3xl font-orbitron font-bold text-white mb-2">
                  {project.myRole.position}
                </h3>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h3 className="text-2xl font-space font-bold text-white mb-6">
                  Key Responsibilities
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.myRole.responsibilities.map((responsibility, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-electric-blue flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-300 font-inter">{responsibility}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills Demonstrated */}
              <div>
                <h3 className="text-2xl font-space font-bold text-white mb-6">
                  Skills Demonstrated
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.myRole.skillsDemonstrated.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-electric-blue to-neon-pink text-white font-space font-semibold text-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Tech Stack */}
          <section id="tech">
            <TechStack technologies={project.technologies} />
          </section>

          {/* Code Snippets */}
          {project.codeSnippets && project.codeSnippets.length > 0 && (
            <section id="code">
              <CodeSnippets snippets={project.codeSnippets} />
            </section>
          )}

          {/* Solution/Process */}
          <section id="solution" className="mb-24">
            {project.process && project.process.timeline && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-8">
                  Development Process
                </h2>

                <div className="space-y-8">
                  {project.process.timeline.map((phase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6"
                    >
                      {/* Timeline Indicator */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-neon-pink flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        {index < project.process.timeline.length - 1 && (
                          <div className="w-1 h-full bg-gradient-to-b from-electric-blue to-neon-pink my-2" />
                        )}
                      </div>

                      {/* Phase Content */}
                      <div className="flex-1 glass-card p-6 rounded-2xl mb-8">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-space font-bold text-white">
                            {phase.phase}
                          </h3>
                          <span className="px-3 py-1 rounded-full bg-electric-blue/20 text-electric-blue text-sm font-space font-semibold">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-gray-300 font-inter mb-4">
                          {phase.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {phase.deliverables.map((deliverable, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-inter"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </section>

          {/* Before & After */}
          {project.beforeAfter && (
            <section className="mb-24">
              <BeforeAfterSlider
                before={project.beforeAfter.before}
                after={project.beforeAfter.after}
              />
            </section>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section id="gallery" className="mb-24">
              <ImageGallery images={project.gallery} />
            </section>
          )}

          {/* Results & Metrics */}
          <section id="results">
            <MetricsSection metrics={project.metrics} />
          </section>

          {/* Key Learnings */}
          <section id="learnings" className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-8">
                Key Learnings & Takeaways
              </h2>

              <div className="space-y-4">
                {project.learnings.map((learning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-2xl flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-neon-pink flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">💡</span>
                    </div>
                    <p className="text-gray-300 font-inter text-lg">{learning}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Testimonial */}
          {project.testimonial && (
            <section className="mb-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-12 rounded-3xl border-2 border-electric-blue/30 relative overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-electric-blue/20 text-9xl font-serif">
                  "
                </div>

                <div className="relative z-10">
                  <p className="text-2xl md:text-3xl font-inter italic text-white mb-8 leading-relaxed">
                    "{project.testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={project.testimonial.avatar}
                      alt={project.testimonial.author}
                      className="w-16 h-16 rounded-full border-2 border-electric-blue"
                    />
                    <div>
                      <p className="text-white font-space font-bold text-lg">
                        {project.testimonial.author}
                      </p>
                      <p className="text-gray-400 font-inter">
                        {project.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="mb-24">
              <RelatedProjects projects={relatedProjects} />
            </section>
          )}

          {/* CTA Section */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-12 rounded-3xl text-center relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-pink/10" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-orbitron font-black gradient-text mb-6">
                  Let's Work Together
                </h2>
                <p className="text-gray-300 font-inter text-xl mb-8 max-w-2xl mx-auto">
                  Impressed by this project? Let's create something amazing together!
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="#contact"
                    className="neon-button clickable"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get in Touch
                  </a>
                  <a
                    href="#projects"
                    className="px-8 py-4 rounded-full font-space font-semibold text-lg border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-deep-purple transition-colors clickable"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View More Projects
                  </a>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
