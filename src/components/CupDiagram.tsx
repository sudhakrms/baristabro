import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Layer {
  name: string;
  color: string;
  percentage: number;
}

interface CupDiagramProps {
  layers: Layer[];
  height?: number;
}

export function CupDiagram({ layers, height = 200 }: CupDiagramProps) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const cupWidth = 120;
  const cupTopY = 10;
  const cupBottomY = height - 10;
  const cupHeight = cupBottomY - cupTopY;
  const cupLeft = 40;
  const cupRight = cupLeft + cupWidth;
  const rimOverhang = 8;
  const cornerRadius = 12;

  // Build layers bottom-up
  const totalPct = layers.reduce((s, l) => s + l.percentage, 0);
  const sortedLayers = [...layers].reverse(); // bottom-first rendering

  let yOffset = cupBottomY;
  const layerRects = sortedLayers.map((layer, i) => {
    const layerH = (layer.percentage / totalPct) * cupHeight;
    const topY = yOffset - layerH;
    const rect = { ...layer, topY, height: layerH, index: i };
    yOffset = topY;
    return rect;
  });

  const cupPath = `
    M ${cupLeft - rimOverhang} ${cupTopY}
    L ${cupRight + rimOverhang} ${cupTopY}
    L ${cupRight} ${cupTopY + 6}
    L ${cupRight} ${cupBottomY - cornerRadius}
    Q ${cupRight} ${cupBottomY} ${cupRight - cornerRadius} ${cupBottomY}
    L ${cupLeft + cornerRadius} ${cupBottomY}
    Q ${cupLeft} ${cupBottomY} ${cupLeft} ${cupBottomY - cornerRadius}
    L ${cupLeft} ${cupTopY + 6}
    Z
  `;

  // Clip path for layers — slightly inset from cup outline
  const inset = 2;
  const clipPath = `
    M ${cupLeft + inset} ${cupTopY + 7}
    L ${cupRight - inset} ${cupTopY + 7}
    L ${cupRight - inset} ${cupBottomY - cornerRadius}
    Q ${cupRight - inset} ${cupBottomY - inset} ${cupRight - cornerRadius} ${cupBottomY - inset}
    L ${cupLeft + cornerRadius} ${cupBottomY - inset}
    Q ${cupLeft + inset} ${cupBottomY - inset} ${cupLeft + inset} ${cupBottomY - cornerRadius}
    Z
  `;

  const svgWidth = cupRight + rimOverhang + 10;

  return (
    <div className="relative" style={{ width: svgWidth + 80 }}>
      <svg
        width="100%"
        viewBox={`0 0 ${svgWidth + 80} ${height + 10}`}
        role="img"
        aria-label="Coffee cup layer diagram"
      >
        <defs>
          <clipPath id="cup-clip">
            <path d={clipPath} />
          </clipPath>
        </defs>

        {/* Cup handle */}
        <path
          d={`M ${cupRight + rimOverhang - 2} ${cupTopY + 30}
              C ${cupRight + rimOverhang + 28} ${cupTopY + 30}
                ${cupRight + rimOverhang + 28} ${cupBottomY - 40}
                ${cupRight + rimOverhang - 2} ${cupBottomY - 40}`}
          fill="none"
          stroke="var(--text-secondary)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* Animated layers */}
        <g clipPath="url(#cup-clip)">
          {layerRects.map((lr, i) => (
            <motion.rect
              key={`${lr.name}-${i}`}
              x={cupLeft + inset}
              width={cupWidth - inset * 2}
              fill={lr.color}
              stroke={activeLayer === i ? 'var(--accent)' : 'none'}
              strokeWidth={activeLayer === i ? 2 : 0}
              initial={{ y: cupBottomY, height: 0 }}
              animate={{ y: lr.topY, height: lr.height }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveLayer(activeLayer === i ? null : i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveLayer(activeLayer === i ? null : i);
              }}
              tabIndex={0}
              role="button"
              aria-label={`${lr.name}: ${lr.percentage}%`}
            />
          ))}
        </g>

        {/* Cup outline */}
        <path
          d={cupPath}
          fill="none"
          stroke="var(--text-secondary)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity={0.6}
        />

        {/* Layer labels */}
        {layerRects.map((lr, i) => {
          if (lr.height < 14) return null;
          const centerY = lr.topY + lr.height / 2;
          return (
            <text
              key={`label-${i}`}
              x={cupLeft + cupWidth / 2}
              y={centerY + 4}
              textAnchor="middle"
              fill={isLightColor(lr.color) ? '#2B1810' : '#FEFCF9'}
              fontSize={lr.height < 22 ? 8 : 10}
              fontFamily="var(--font-body)"
              fontWeight={500}
              style={{ pointerEvents: 'none' }}
            >
              {lr.name}
            </text>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {activeLayer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-0 right-0 text-center text-sm px-2 py-1 rounded"
            style={{
              bottom: -28,
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              fontSize: 12,
            }}
          >
            {layerRects[activeLayer].name} — {layerRects[activeLayer].percentage}%
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
