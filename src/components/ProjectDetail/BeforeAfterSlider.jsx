import { useState } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterSlider = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e) => {
    if (!isDragging && e.type !== 'click') return;

    const container = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - container.left;
    const percentage = (x / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-4">
          Before & After
        </h3>
        <p className="text-gray-300 font-inter text-lg">
          See the transformation in action
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full aspect-video overflow-hidden rounded-3xl glass-card cursor-ew-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onClick={handleMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img
            src={before.image}
            alt={before.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-red-500/80 backdrop-blur-sm">
            <span className="text-white font-space font-bold text-sm">
              BEFORE
            </span>
          </div>
        </div>

        {/* After Image */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={after.image}
            alt={after.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-electric-blue/80 backdrop-blur-sm">
            <span className="text-white font-space font-bold text-sm">
              AFTER
            </span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
          <div className="glass-card px-4 py-2 rounded-full">
            <p className="text-white font-inter text-sm">{before.label}</p>
          </div>
          <div className="glass-card px-4 py-2 rounded-full">
            <p className="text-white font-inter text-sm">{after.label}</p>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center text-gray-400 font-inter text-sm mt-4"
      >
        Click and drag the slider or click anywhere on the image to compare
      </motion.p>
    </div>
  );
};

export default BeforeAfterSlider;
