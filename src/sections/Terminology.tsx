import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { terminology, type Term } from '../data/terminology';

const categories = ['All', 'Brewing', 'Tasting', 'Equipment', 'Culture'] as const;
type Category = (typeof categories)[number];

function FlipCard({ term, index }: { term: Term; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="h-48 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border p-5 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
          }}
        >
          <span
            className="text-[10px] uppercase tracking-widest font-medium"
            style={{ color: 'var(--accent)' }}
          >
            {term.category}
          </span>
          <h3
            className="text-lg font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
            }}
          >
            {term.term}
          </h3>
          <span className="text-xs self-end" style={{ color: 'var(--text-secondary)' }}>
            tap to flip
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border p-5 overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--accent)',
          }}
        >
          <h4
            className="text-sm font-bold mb-2"
            style={{ color: 'var(--accent)' }}
          >
            {term.term}
          </h4>
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {term.definition}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Terminology() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = useMemo(() => {
    return terminology.filter((t) => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      const matchesSearch =
        search === '' ||
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div>
      {/* Header */}
      <h2
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        Coffee Terminology
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Your glossary of essential coffee terms
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--text-secondary)' }}
        />
        <input
          type="text"
          placeholder="Search terms…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--bg-secondary)',
              color: activeCategory === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
        Showing {filtered.length} of {terminology.length} terms
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((term, i) => (
            <FlipCard key={term.term} term={term} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p
          className="text-center py-12 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          No terms match your search. Try a different keyword.
        </p>
      )}
    </div>
  );
}
