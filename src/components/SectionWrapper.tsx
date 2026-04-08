import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Use alternate background for visual rhythm between sections */
  alternate?: boolean;
}

export function SectionWrapper({ id, children, className = '', alternate = false }: SectionWrapperProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id={id}
      ref={ref}
      className={`px-4 md:px-8 lg:px-16 xl:px-24 ${className}`}
      style={{
        backgroundColor: alternate ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
