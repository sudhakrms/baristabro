import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function CoffeeSteam() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="w-24 h-32 md:w-32 md:h-40 mx-auto mb-4"
      aria-hidden="true"
    >
      {/* Coffee cup */}
      <rect
        x="25" y="70" width="50" height="35" rx="4"
        fill="var(--accent)"
        opacity="0.8"
      />
      <rect
        x="20" y="65" width="60" height="10" rx="5"
        fill="var(--accent)"
      />
      {/* Handle */}
      <path
        d="M75 78 Q88 78 88 88 Q88 98 75 98"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        opacity="0.8"
      />
      {/* Steam lines */}
      {[35, 50, 65].map((x, i) => (
        <motion.path
          key={i}
          d={`M${x} 60 Q${x - 5} 45 ${x} 30 Q${x + 5} 15 ${x} 0`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CoffeeSteam />

        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
          }}
        >
          The Art &amp; Science of Coffee
        </h1>

        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          Explore the world of coffee — from bean to cup. Discover origins,
          master brewing techniques, and develop your palate.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#bean-explorer"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('bean-explorer')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to content"
        style={{ color: 'var(--accent)' }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}
