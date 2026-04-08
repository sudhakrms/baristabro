import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Bean Explorer', href: '#bean-explorer' },
  { label: 'Terminology', href: '#terminology' },
  { label: 'Flavor Wheel', href: '#flavor-wheel' },
  { label: 'Drinks Guide', href: '#drinks-guide' },
  { label: 'Brewing Methods', href: '#brewing-methods' },
  { label: 'Indian Coffee', href: '#indian-coffee' },
] as const;

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-bold"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--accent)',
            letterSpacing: 'var(--heading-letter-spacing)',
          }}
        >
          BrewSchool
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast), background-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded-xl cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-72 z-50 border-l shadow-2xl md:hidden"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-xl cursor-pointer"
                style={{ color: 'var(--text-primary)' }}
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                  onClick={(e) => {
                    scrollToSection(e, link.href);
                    setMobileOpen(false);
                  }}
                  className="py-3 px-4 rounded-xl text-base font-medium"
                  style={{
                    color: 'var(--text-primary)',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
