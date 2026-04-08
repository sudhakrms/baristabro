import { Coffee } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center gap-4 text-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-bold"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--accent)',
            letterSpacing: 'var(--heading-letter-spacing)',
          }}
        >
          BrewSchool
        </a>

        <p
          className="flex items-center gap-1.5 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Made with <Coffee size={14} style={{ color: 'var(--accent)' }} /> and curiosity
        </p>

        <p
          className="text-xs"
          style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
        >
          An interactive coffee education experience
        </p>
      </div>
    </footer>
  );
}
