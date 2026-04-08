import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Timer,
  Scaling,
  Coffee,
  ChevronRight,
  ChevronLeft,
  X,
  Wrench,
} from 'lucide-react';
import { brewingMethods, type BrewingMethod } from '../data/brewingMethods';

const difficultyColors: Record<string, string> = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Advanced: '#ef4444',
};

function MethodCard({
  method,
  onExpand,
}: {
  method: BrewingMethod;
  onExpand: () => void;
}) {
  return (
    <motion.div
      layout
      className="cursor-pointer overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label={`${method.name} — ${method.difficulty} difficulty`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--card-radius)',
        border: 'var(--card-border)',
        boxShadow: 'var(--card-shadow)',
      }}
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand();
        }
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3
            className="font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-card-title)',
              letterSpacing: 'var(--heading-letter-spacing)',
            }}
          >
            {method.name}
          </h3>
          <span
            className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full shrink-0"
            style={{
              backgroundColor: `${difficultyColors[method.difficulty]}20`,
              color: difficultyColors[method.difficulty],
            }}
          >
            {method.difficulty}
          </span>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Coffee, label: 'Grind', value: method.grindSize.split('(')[0].trim() },
            { icon: Thermometer, label: 'Temp', value: method.waterTemp.split('(')[0].trim() },
            { icon: Timer, label: 'Time', value: method.brewTime },
            { icon: Scaling, label: 'Ratio', value: method.ratio.split('(')[0].trim() },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-2 rounded-lg p-2.5"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <Icon
                size={14}
                className="shrink-0 mt-0.5"
                style={{ color: 'var(--accent)' }}
              />
              <div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  {label}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ExpandedMethod({
  method,
  onClose,
}: {
  method: BrewingMethod;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = method.steps.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--card-radius)',
        border: '1px solid var(--accent)',
        boxShadow: 'var(--card-shadow-hover)',
      }}
    >
      <div className="p-5 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3
                className="font-bold"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-section)',
                  letterSpacing: 'var(--heading-letter-spacing)',
                }}
              >
                {method.name}
              </h3>
              <span
                className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${difficultyColors[method.difficulty]}20`,
                  color: difficultyColors[method.difficulty],
                }}
              >
                {method.difficulty}
              </span>
            </div>
            <p className="text-sm max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {method.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:opacity-70 transition-opacity shrink-0"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Close walkthrough"
          >
            <X size={22} />
          </button>
        </div>

        {/* Specs bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Coffee, label: 'Grind', value: method.grindSize },
            { icon: Thermometer, label: 'Water Temp', value: method.waterTemp },
            { icon: Timer, label: 'Brew Time', value: method.brewTime },
            { icon: Scaling, label: 'Ratio', value: method.ratio },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-2.5 rounded-xl p-3"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <Icon size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
              <div>
                <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                  {label}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
            Step {currentStep + 1} / {totalSteps}
          </span>
          <div className="flex-1 flex gap-1">
            {method.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className="flex-1 h-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: i <= currentStep ? 'var(--accent)' : 'var(--border)',
                  opacity: i === currentStep ? 1 : i < currentStep ? 0.6 : 0.3,
                }}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div
          className="rounded-xl p-5 md:p-6 mb-6 min-h-[120px]"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  {currentStep + 1}
                </span>
                <p
                  className="text-sm leading-relaxed pt-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {method.steps[currentStep]}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-30"
            style={{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))}
            disabled={currentStep === totalSteps - 1}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-30"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
            }}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Equipment list */}
        <div>
          <h4
            className="flex items-center gap-2 text-sm font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            <Wrench size={14} style={{ color: 'var(--accent)' }} />
            Equipment Needed
          </h4>
          <div className="flex flex-wrap gap-2">
            {method.equipment.map((item) => (
              <span
                key={item}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function BrewingMethods() {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);

  const expanded = brewingMethods.find((m) => m.name === expandedMethod);

  return (
    <div>
      {/* Header */}
      <h2
        className="font-bold mb-2"
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-primary)',
          fontSize: 'var(--text-section)',
          letterSpacing: 'var(--heading-letter-spacing)',
          textShadow: 'var(--heading-glow)',
        }}
      >
        Brewing Methods
      </h2>
      <p className="mb-10" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-small)' }}>
        Master {brewingMethods.length} ways to brew — from beginner-friendly to advanced
      </p>

      <AnimatePresence mode="wait">
        {expanded ? (
          <ExpandedMethod
            key={expanded.name}
            method={expanded}
            onClose={() => setExpandedMethod(null)}
          />
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {brewingMethods.map((method) => (
              <motion.div key={method.name} variants={staggerItem}>
                <MethodCard
                  method={method}
                  onExpand={() => setExpandedMethod(method.name)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
