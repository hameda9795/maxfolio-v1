import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RelatedProjectCard = ({ project }) => {
  const { t } = useTranslation();

  return (
    <motion.a
      href={`/project/${project.slug}`}
      className="block group cursor-pointer h-full"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.hero.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-purple via-deep-purple/50 to-transparent opacity-60" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-4 py-2 rounded-full text-xs font-space font-bold bg-gradient-to-r from-electric-blue to-neon-pink text-white shadow-lg">
              {t(`projects.filter.${project.category}`)}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-electric-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white font-space font-bold text-lg flex items-center gap-2">
              <span>View Project</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h4 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
            {project.title}
          </h4>
          <p className="text-gray-400 font-inter text-sm mb-4 line-clamp-2 flex-1">
            {project.subtitle}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 font-space">
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.role}</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const RelatedProjects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

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
          Related Projects
        </h3>
        <p className="text-gray-300 font-inter text-lg">
          Explore more projects from my portfolio
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!pb-12"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <RelatedProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="swiper-button-prev-custom absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-electric-blue hover:bg-electric-blue hover:text-white transition-all clickable group"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="swiper-button-next-custom absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-card flex items-center justify-center text-electric-blue hover:bg-electric-blue hover:text-white transition-all clickable group"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(15, 244, 198, 0.5);
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #0FF4C6;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default RelatedProjects;
