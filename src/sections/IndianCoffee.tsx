import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TasteRadar } from '../components/TasteRadar';
import { indianCoffeeBrands, type IndianCoffeeBrand } from '../data/indianCoffee';

type CategoryFilter = 'All' | 'Estates' | 'Brands' | 'Espresso';

const TABS: CategoryFilter[] = ['All', 'Estates', 'Brands', 'Espresso'];

function filterBrands(brands: IndianCoffeeBrand[], tab: CategoryFilter): IndianCoffeeBrand[] {
  if (tab === 'All') return brands;
  if (tab === 'Estates') return brands.filter((b) => b.type === 'estate');
  if (tab === 'Brands') return brands.filter((b) => b.type === 'brand');
  // Espresso: category is 'espresso' or 'both'
  return brands.filter((b) => b.category === 'espresso' || b.category === 'both');
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function TypeBadge({ type }: { type: IndianCoffeeBrand['type'] }) {
  const labels: Record<IndianCoffeeBrand['type'], string> = {
    estate: 'Estate',
    brand: 'Brand',
    blend: 'Blend',
  };

  return (
    <span
      className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--accent)',
        border: '1px solid var(--border)',
      }}
    >
      {labels[type]}
    </span>
  );
}

function BrandCard({
  brand,
  isExpanded,
  onToggle,
}: {
  brand: IndianCoffeeBrand;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const DESC_LIMIT = 120;
  const truncatedDesc =
    brand.description.length > DESC_LIMIT
      ? brand.description.slice(0, DESC_LIMIT).trimEnd() + '…'
      : brand.description;

  return (
    <motion.div
      layout
      className="cursor-pointer overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--card-radius)',
        border: isExpanded ? '1px solid var(--accent)' : 'var(--card-border)',
        boxShadow: isExpanded ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
        borderLeft: `4px solid ${brand.color}`,
      }}
      role="button"
      tabIndex={0}
      aria-label={`${brand.name} — ${brand.type}. ${isExpanded ? 'Click to collapse' : 'Click to expand'}`}
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-5 pt-5 pb-4 md:px-6 md:pt-6 md:pb-4">
        {/* Header: name + type badge */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: brand.color }}
            />
            <h3
              className="font-bold"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-card-title)',
                letterSpacing: 'var(--heading-letter-spacing)',
              }}
            >
              {brand.name}
            </h3>
          </div>
          <TypeBadge type={brand.type} />
        </div>

        {/* Region */}
        <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
          {brand.region}
          {brand.altitude && ` · ${brand.altitude}`}
        </p>

        {/* Radar chart */}
        <div className="flex justify-center mb-3">
          <TasteRadar
            scores={{
              acidity: brand.acidity,
              body: brand.body,
              sweetness: brand.sweetness,
              bitterness: brand.bitterness,
              aftertaste: brand.aftertaste,
            }}
            size={180}
          />
        </div>

        {/* Flavor notes (compact) */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {brand.flavorNotes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--accent)',
                border: '1px solid var(--border)',
              }}
            >
              {note}
            </span>
          ))}
          {brand.flavorNotes.length > 3 && (
            <span className="text-xs px-2 py-0.5" style={{ color: 'var(--text-secondary)' }}>
              +{brand.flavorNotes.length - 3} more
            </span>
          )}
        </div>

        {/* Description (truncated) */}
        {!isExpanded && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {truncatedDesc}
          </p>
        )}
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 md:px-6 md:pb-6 pt-1 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Larger radar */}
              <div className="flex justify-center my-4">
                <TasteRadar
                  scores={{
                    acidity: brand.acidity,
                    body: brand.body,
                    sweetness: brand.sweetness,
                    bitterness: brand.bitterness,
                    aftertaste: brand.aftertaste,
                  }}
                  size={260}
                />
              </div>

              {/* Full description */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {brand.description}
              </p>

              {/* All flavor notes */}
              <div className="mb-4">
                <h4
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Flavor Notes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {brand.flavorNotes.map((note) => (
                    <span
                      key={note}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--accent)',
                        border: '1px solid var(--accent)',
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notable products */}
              <div className="mb-4">
                <h4
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Notable Products
                </h4>
                <ul className="space-y-1">
                  {brand.notableProducts.map((product) => (
                    <li
                      key={product}
                      className="text-sm flex items-center gap-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: brand.color }}
                      />
                      {product}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta row: processing + established */}
              <div className="flex flex-wrap gap-2">
                {brand.processingMethod && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    ☕ {brand.processingMethod}
                  </span>
                )}
                {brand.established && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    Est. {brand.established}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function IndianCoffee() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('All');
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  const filtered = filterBrands(indianCoffeeBrands, activeTab);

  const toggleExpand = (name: string) => {
    setExpandedBrand((prev) => (prev === name ? null : name));
  };

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
        Indian Coffee Heritage
      </h2>
      <p className="mb-10 max-w-2xl" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-small)' }}>
        From Baba Budan's 7 beans to specialty roasters — India's coffee journey
      </p>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Coffee categories">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => {
              setActiveTab(tab);
              setExpandedBrand(null);
            }}
            className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
            style={{
              backgroundColor: activeTab === tab ? 'var(--accent)' : 'var(--bg-secondary)',
              color: activeTab === tab ? '#FEFCF9' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--border)'}`,
              minHeight: '40px',
              transition: 'all var(--transition-fast)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        role="tabpanel"
        aria-label={`${activeTab} coffee brands`}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((brand) => (
            <motion.div key={brand.name} variants={staggerItem} layout>
              <BrandCard
                brand={brand}
                isExpanded={expandedBrand === brand.name}
                onToggle={() => toggleExpand(brand.name)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
