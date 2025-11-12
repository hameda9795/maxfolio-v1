import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const MetricCard = ({ metric, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setStartCount(true), index * 100);
    }
  }, [isInView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card p-8 rounded-3xl relative overflow-hidden group"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(15, 244, 198, 0.1) 0%, rgba(255, 0, 110, 0.1) 100%)',
            'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(15, 244, 198, 0.1) 100%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Icon */}
      <div className="relative z-10">
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          {metric.icon}
        </motion.div>

        {/* Metric Value */}
        <div className="mb-2">
          {startCount ? (
            <h4 className="text-5xl md:text-6xl font-orbitron font-black gradient-text">
              <CountUp
                end={metric.value}
                duration={2}
                decimals={metric.value % 1 !== 0 ? 1 : 0}
                suffix={metric.suffix || ''}
              />
            </h4>
          ) : (
            <h4 className="text-5xl md:text-6xl font-orbitron font-black gradient-text">
              0{metric.suffix || ''}
            </h4>
          )}
        </div>

        {/* Label */}
        <h5 className="text-xl font-space font-bold text-white mb-2">
          {metric.label}
        </h5>

        {/* Description */}
        <p className="text-gray-400 font-inter text-sm">
          {metric.description}
        </p>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-electric-blue/20 to-transparent rounded-bl-full opacity-50" />
    </motion.div>
  );
};

const MetricsSection = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-4">
          Results & Impact
        </h3>
        <p className="text-gray-300 font-inter text-lg max-w-2xl mx-auto">
          Measurable outcomes that demonstrate the project's success
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>

      {/* Visual Separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-1 bg-gradient-to-r from-electric-blue to-neon-pink rounded-full mt-16 max-w-2xl mx-auto"
      />
    </div>
  );
};

export default MetricsSection;
