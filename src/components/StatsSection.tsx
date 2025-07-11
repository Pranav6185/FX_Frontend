import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when it comes into view
    threshold: 0.3,     // Trigger when 30% visible
  });

  return (
    <section ref={ref} className="py-16 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-bold mb-8">Our Impact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
        <div>
          <h3 className="text-5xl font-bold text-yellow-400">
            {inView ? <CountUp end={5000} duration={2.5} /> : '0'}+
          </h3>
          <p className="mt-2 text-lg">Students Trained</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold text-green-400">
            {inView ? <CountUp end={120} duration={2.5} /> : '0'}
          </h3>
          <p className="mt-2 text-lg">Batches Completed</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold text-blue-400">
            {inView ? <CountUp end={98} duration={2.5} suffix="%" /> : '0%'}
          </h3>
          <p className="mt-2 text-lg">Success Rate</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;