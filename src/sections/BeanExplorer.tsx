import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompareArrows } from 'lucide-react';
import { beans, type Bean } from '../data/beans';

import arabicaSvg from '../assets/beans/arabica.svg';
import robustaSvg from '../assets/beans/robusta.svg';
import libericaSvg from '../assets/beans/liberica.svg';
import excelsaSvg from '../assets/beans/excelsa.svg';

const beanImages: Record<string, string> = {
  Arabica: arabicaSvg,
  Robusta: robustaSvg,
  Liberica: libericaSvg,
  Excelsa: excelsaSvg,
};

const tasteAxes = ['acidity', 'body', 'sweetness', 'bitterness', 'aftertaste'] as const;

function TasteBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="w-20 text-right capitalize shrink-0"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--border)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span
        className="w-6 text-xs tabular-nums"
        style={{ color: 'var(--text-secondary)' }}
      >
        {value}
      </span>
    </div>
  );
}

function BeanCard({
  bean,
  isSelected,
  compareMode,
  isCompared,
  onToggle,
  onCompareToggle,
}: {
  bean: Bean;
  isSelected: boolean;
  compareMode: boolean;
  isCompared: boolean;
  onToggle: () => void;
  onCompareToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className={`cursor-pointer overflow-hidden ${
        isCompared ? 'ring-2 ring-[var(--accent)]' : ''
      }`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--card-radius)',
        border: isCompared ? '1px solid var(--accent)' : 'var(--card-border)',
        boxShadow: 'var(--card-shadow)',
      }}
      role="button"
      tabIndex={0}
      aria-label={`${bean.name} bean${compareMode ? (isCompared ? ' — selected for comparison' : ' — click to compare') : ''}`}
      onClick={() => {
        if (compareMode) {
          onCompareToggle();
        } else {
          onToggle();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (compareMode) onCompareToggle();
          else onToggle();
        }
      }}
      whileHover={{ scale: compareMode ? 1 : 1.015 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero bean image */}
      <div className="flex items-center justify-center pt-5 pb-2 md:pt-6 md:pb-3">
        <motion.img
          src={beanImages[bean.name]}
          alt={`${bean.name} coffee bean illustration`}
          className="drop-shadow-lg"
          style={{ width: 140, height: 140, objectFit: 'contain' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.08, rotate: 6 }}
        />
      </div>

      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-card-title)',
                letterSpacing: 'var(--heading-letter-spacing)',
              }}
            >
              {bean.name}
            </h3>
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
              {bean.species}
            </p>
          </div>
          {compareMode && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0`}
              style={{ borderColor: 'var(--accent)' }}
            >
              {isCompared && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              )}
            </motion.div>
          )}
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Caffeine', value: bean.caffeine.split('(')[0].trim() },
            { label: 'Altitude', value: bean.altitude.split('(')[0].trim() },
            { label: 'Market', value: bean.marketShare },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-2 text-center"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
              <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Flavor tags (limited) */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {bean.flavorProfile.slice(0, 4).map((flavor) => (
            <span
              key={flavor}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--accent)',
                border: '1px solid var(--border)',
              }}
            >
              {flavor}
            </span>
          ))}
          {bean.flavorProfile.length > 4 && (
            <span className="text-xs px-2 py-0.5" style={{ color: 'var(--text-secondary)' }}>
              +{bean.flavorProfile.length - 4} more
            </span>
          )}
        </div>

        {/* Taste profile (compact) */}
        <div className="space-y-1.5">
          {tasteAxes.map((axis) => (
            <TasteBar key={axis} label={axis} value={bean[axis]} />
          ))}
        </div>
      </div>

      {/* Expanded view */}
      <AnimatePresence>
        {isSelected && !compareMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 md:px-6 md:pb-6 pt-2 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Larger bean image in expanded view */}
              <div className="flex justify-center mb-4">
                <motion.img
                  src={beanImages[bean.name]}
                  alt={`${bean.name} coffee bean — detailed view`}
                  style={{ width: 220, height: 220, objectFit: 'contain' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {bean.description}
              </p>

              {/* Growing regions */}
              <div className="mb-4">
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Growing Regions
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {bean.regions.map((region) => (
                    <span
                      key={region}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size indicator */}
              <div className="mb-4">
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Bean Size
                </h4>
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full"
                    style={{
                      backgroundColor: 'var(--accent)',
                      width: bean.name === 'Liberica' ? 40 : bean.name === 'Arabica' ? 28 : bean.name === 'Robusta' ? 22 : 24,
                      height: bean.name === 'Liberica' ? 40 : bean.name === 'Arabica' ? 28 : bean.name === 'Robusta' ? 22 : 24,
                      opacity: 0.6,
                    }}
                  />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {bean.size} — {bean.shape}
                  </span>
                </div>
              </div>

              {/* All flavor profile */}
              <div>
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Full Flavor Profile
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {bean.flavorProfile.map((flavor) => (
                    <span
                      key={flavor}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--accent)',
                        border: '1px solid var(--accent)',
                      }}
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ComparisonPanel({
  beanA,
  beanB,
  onClose,
}: {
  beanA: Bean;
  beanB: Bean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border p-5 md:p-6"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--accent)',
        borderRadius: 'var(--card-radius)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-lg font-bold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          {beanA.name} vs {beanB.name}
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Close comparison"
        >
          <X size={20} />
        </button>
      </div>

      {/* Side-by-side bean images */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="text-center">
          <motion.img
            src={beanImages[beanA.name]}
            alt={`${beanA.name} bean`}
            style={{ width: 120, height: 120, objectFit: 'contain' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <span className="text-xs font-semibold mt-1 block" style={{ color: 'var(--accent)' }}>
            {beanA.name}
          </span>
        </div>
        <span className="text-lg font-bold" style={{ color: 'var(--text-secondary)' }}>vs</span>
        <div className="text-center">
          <motion.img
            src={beanImages[beanB.name]}
            alt={`${beanB.name} bean`}
            style={{ width: 120, height: 120, objectFit: 'contain' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          />
          <span className="text-xs font-semibold mt-1 block" style={{ color: 'var(--accent)' }}>
            {beanB.name}
          </span>
        </div>
      </div>

      {/* Side-by-side stats */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-3 mb-6">
        <div className="text-center font-semibold text-sm" style={{ color: 'var(--accent)' }}>
          {beanA.name}
        </div>
        <div />
        <div className="text-center font-semibold text-sm" style={{ color: 'var(--accent)' }}>
          {beanB.name}
        </div>

        {[
          { label: 'Species', a: beanA.species, b: beanB.species },
          { label: 'Caffeine', a: beanA.caffeine.split('(')[0].trim(), b: beanB.caffeine.split('(')[0].trim() },
          { label: 'Market Share', a: beanA.marketShare, b: beanB.marketShare },
          { label: 'Altitude', a: beanA.altitude.split('(')[0].trim(), b: beanB.altitude.split('(')[0].trim() },
          { label: 'Size', a: beanA.size, b: beanB.size },
        ].map((row) => (
          <React.Fragment key={row.label}>
            <div className="text-sm text-right" style={{ color: 'var(--text-primary)' }}>
              {row.a}
            </div>
            <div
              className="text-xs text-center font-medium self-center whitespace-nowrap"
              style={{ color: 'var(--text-secondary)' }}
            >
              {row.label}
            </div>
            <div className="text-sm" style={{ color: 'var(--text-primary)' }}>
              {row.b}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Taste comparison */}
      <h4
        className="text-sm font-semibold mb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        Taste Profile Comparison
      </h4>
      <div className="space-y-3">
        {tasteAxes.map((axis) => (
          <div key={axis} className="space-y-1">
            <div
              className="text-xs capitalize text-center"
              style={{ color: 'var(--text-secondary)' }}
            >
              {axis}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-6 text-right tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                {beanA[axis]}
              </span>
              <div className="flex-1 flex items-center gap-0.5">
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--border)' }}
                >
                  <motion.div
                    className="h-full rounded-full ml-auto"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.7 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(beanA[axis] / 10) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--border)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(beanB[axis] / 10) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              <span className="text-xs w-6 tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                {beanB[axis]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function BeanExplorer() {
  const [expandedBean, setExpandedBean] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedBeans, setComparedBeans] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpandedBean((prev) => (prev === name ? null : name));
  };

  const toggleCompare = (name: string) => {
    setComparedBeans((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= 2) return [prev[1], name];
      return [...prev, name];
    });
  };

  const exitCompareMode = () => {
    setCompareMode(false);
    setComparedBeans([]);
  };

  const comparedBeanData = comparedBeans
    .map((name) => beans.find((b) => b.name === name))
    .filter(Boolean) as Bean[];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
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
            Bean Explorer
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-small)' }}>
            Discover the world's four commercial coffee species
          </p>
        </div>
        <button
          onClick={() => (compareMode ? exitCompareMode() : setCompareMode(true))}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium self-start cursor-pointer ${
            compareMode ? 'ring-2 ring-[var(--accent)]' : ''
          }`}
          style={{
            backgroundColor: compareMode ? 'var(--accent)' : 'var(--bg-secondary)',
            color: compareMode ? 'var(--bg-primary)' : 'var(--text-primary)',
            border: `1px solid ${compareMode ? 'var(--accent)' : 'var(--border)'}`,
          }}
        >
          <GitCompareArrows size={16} />
          {compareMode ? 'Exit Compare' : 'Compare'}
        </button>
      </div>

      {compareMode && (
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Select 2 beans to compare • {comparedBeans.length}/2 selected
        </p>
      )}

      {/* Bean grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {beans.map((bean) => (
          <motion.div key={bean.name} variants={staggerItem}>
            <BeanCard
              bean={bean}
              isSelected={expandedBean === bean.name}
              compareMode={compareMode}
              isCompared={comparedBeans.includes(bean.name)}
              onToggle={() => toggleExpand(bean.name)}
              onCompareToggle={() => toggleCompare(bean.name)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Comparison panel */}
      <AnimatePresence>
        {compareMode && comparedBeanData.length === 2 && (
          <div className="mt-6">
            <ComparisonPanel
              beanA={comparedBeanData[0]}
              beanB={comparedBeanData[1]}
              onClose={exitCompareMode}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
