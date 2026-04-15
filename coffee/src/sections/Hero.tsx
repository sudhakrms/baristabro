import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function BaristaCharacter() {
  return (
    <svg
      viewBox="0 0 120 140"
      className="w-32 h-40 md:w-40 md:h-48 mx-auto mb-6"
      aria-hidden="true"
    >
      {/* Face */}
      <circle cx="60" cy="50" r="36" fill="#D4A574" />
      
      {/* Hair (short, neat) */}
      <path d="M30 44 C30 26, 40 16, 60 16 C80 16, 90 26, 90 44 L90 50 L30 50 Z" fill="#3D2817" />
      
      {/* Ears */}
      <ellipse cx="26" cy="50" rx="6" ry="9" fill="#C9965A" />
      <ellipse cx="94" cy="50" rx="6" ry="9" fill="#C9965A" />
      
      {/* Eyes with friendly expression */}
      <motion.circle
        cx="47" cy="46" r="3"
        fill="#2B1810"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.circle
        cx="73" cy="46" r="3"
        fill="#2B1810"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
      />
      
      {/* Mustache (prominent, well-groomed) */}
      <path d="M38 58 Q46 55, 60 55 Q74 55, 82 58 Q76 61, 68 61 Q65 61, 60 60.5 Q55 61, 52 61 Q44 61, 38 58 Z" fill="#3D2817" />
      
      {/* Beard (neat, full) */}
      <path d="M34 60 Q34 76, 60 80 Q86 76, 86 60 L82 58 Q76 66, 60 66 Q44 66, 38 58 Z" fill="#3D2817" />
      
      {/* Shoulders/Apron */}
      <rect x="30" y="82" width="60" height="30" rx="4" fill="var(--accent)" opacity="0.9" />
      <path d="M50 82 L60 88 L70 82" stroke="var(--bg-primary)" strokeWidth="2" fill="none" />
      
      {/* Coffee cup in hand */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="88" y="95" width="22" height="18" rx="2" fill="#8B4513" />
        <rect x="86" y="92" width="26" height="6" rx="3" fill="#6F360F" />
        {/* Steam */}
        {[94, 100, 106].map((x, i) => (
          <motion.path
            key={i}
            d={`M${x} 90 Q${x - 2} 82 ${x} 75`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <BaristaCharacter />

        <h1
          className="font-bold mb-6"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-hero)',
            letterSpacing: 'var(--heading-letter-spacing)',
            lineHeight: 1.1,
            textShadow: 'var(--heading-glow)',
          }}
        >
          Your Coffee Journey Starts Here
        </h1>

        <p
          className="max-w-2xl mx-auto mb-14"
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)',
            lineHeight: 1.7,
          }}
        >
          Hey, I'm your barista bro. Let's explore coffee together — from bean origins to perfect brews. No pretense, just great coffee knowledge.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#bean-explorer"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('bean-explorer')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-10 w-11 h-11 flex items-center justify-center rounded-full"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to content"
        style={{
          color: 'var(--accent)',
          backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
        }}
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  );
}
