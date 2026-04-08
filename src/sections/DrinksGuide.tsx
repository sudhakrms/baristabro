import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ChevronDown } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { CupDiagram } from '../components/CupDiagram';
import { drinks, type Drink } from '../data/drinks';

type DrinkType = 'All' | Drink['type'];

const TABS: DrinkType[] = ['All', 'Espresso-based', 'Traditional', 'Specialty'];

export function DrinksGuide() {
  const [activeTab, setActiveTab] = useState<DrinkType>('All');
  const [expandedDrink, setExpandedDrink] = useState<string | null>(null);

  const filtered = activeTab === 'All' ? drinks : drinks.filter((d) => d.type === activeTab);

  const toggleDrink = (name: string) => {
    setExpandedDrink(expandedDrink === name ? null : name);
  };

  return (
    <SectionWrapper id="drinks-guide">
      <h2
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        Drinks Guide
      </h2>
      <p className="mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
        Visual guide to 20 classic and specialty coffee drinks — tap any card to see its layered
        composition.
      </p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Drink categories">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => {
              setActiveTab(tab);
              setExpandedDrink(null);
            }}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
            style={{
              backgroundColor: activeTab === tab ? 'var(--accent)' : 'var(--bg-secondary)',
              color: activeTab === tab ? '#FEFCF9' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Drinks grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
        role="tabpanel"
        aria-label={`${activeTab} drinks`}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((drink, index) => (
            <motion.div
              key={drink.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <DrinkCard
                drink={drink}
                isExpanded={expandedDrink === drink.name}
                onToggle={() => toggleDrink(drink.name)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}

interface DrinkCardProps {
  drink: Drink;
  isExpanded: boolean;
  onToggle: () => void;
}

function DrinkCard({ drink, isExpanded, onToggle }: DrinkCardProps) {
  const compositionEntries = Object.entries(drink.composition).filter(([, v]) => v > 0);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: `1px solid ${isExpanded ? 'var(--accent)' : 'var(--border)'}`,
      }}
    >
      {/* Card header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-center gap-3 cursor-pointer"
        style={{ background: 'none', border: 'none' }}
        aria-expanded={isExpanded}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: drink.layers[drink.layers.length - 1]?.color ?? 'var(--accent)' }}
        >
          <Coffee size={18} color="#FEFCF9" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-base truncate"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {drink.name}
          </h3>
          <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
            {drink.servingSize}
          </p>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
        </motion.div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {drink.description}
              </p>

              {/* Cup diagram + composition side by side */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="shrink-0">
                  <CupDiagram layers={drink.layers} height={180} />
                </div>

                <div className="flex-1 space-y-3">
                  {/* Composition breakdown */}
                  <div>
                    <h4
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Composition
                    </h4>
                    <div className="space-y-1.5">
                      {compositionEntries.map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 text-xs">
                          <span
                            className="capitalize w-20"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {key}
                          </span>
                          <span
                            className="font-semibold w-8 text-right"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Horizontal stacked bar */}
                  <div>
                    <h4
                      className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Visual Breakdown
                    </h4>
                    <CompositionBar drink={drink} />
                  </div>
                </div>
              </div>

              {/* Origin */}
              <div>
                <h4
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Origin
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {drink.origin}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const COMP_COLORS: Record<string, string> = {
  espresso: '#3C1518',
  milk: '#F5E6D3',
  foam: '#FFF8F0',
  water: '#C4E0F9',
  other: '#D4A574',
};

function CompositionBar({ drink }: { drink: Drink }) {
  const entries = Object.entries(drink.composition).filter(([, v]) => v > 0);
  return (
    <div
      className="flex rounded-full overflow-hidden h-4"
      style={{ border: '1px solid var(--border)' }}
      role="img"
      aria-label={`Composition: ${entries.map(([k, v]) => `${k} ${v}%`).join(', ')}`}
    >
      {entries.map(([key, value]) => (
        <motion.div
          key={key}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ backgroundColor: COMP_COLORS[key] ?? 'var(--accent)' }}
          title={`${key}: ${value}%`}
        />
      ))}
    </div>
  );
}
