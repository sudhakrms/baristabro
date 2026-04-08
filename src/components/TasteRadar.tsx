interface TasteScores {
  acidity: number;
  body: number;
  sweetness: number;
  bitterness: number;
  aftertaste: number;
}

interface TasteRadarProps {
  scores: TasteScores;
  size?: number;
}

const AXES: { key: keyof TasteScores; label: string; angle: number }[] = [
  { key: 'acidity', label: 'Acidity', angle: -90 },
  { key: 'body', label: 'Body', angle: -18 },
  { key: 'sweetness', label: 'Sweetness', angle: 54 },
  { key: 'bitterness', label: 'Bitterness', angle: 126 },
  { key: 'aftertaste', label: 'Aftertaste', angle: 198 },
];

const MAX_SCORE = 10;

export function TasteRadar({ scores, size = 220 }: TasteRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;

  const toXY = (angle: number, r: number) => ({
    x: cx + r * Math.cos((angle * Math.PI) / 180),
    y: cy + r * Math.sin((angle * Math.PI) / 180),
  });

  // Concentric guide rings
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Data polygon
  const dataPoints = AXES.map((axis) => {
    const score = scores[axis.key] ?? 0;
    const r = (score / MAX_SCORE) * radius;
    return toXY(axis.angle, r);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Taste radar: acidity ${scores.acidity}, body ${scores.body}, sweetness ${scores.sweetness}, bitterness ${scores.bitterness}, aftertaste ${scores.aftertaste}`}
      style={{ maxWidth: size }}
    >
      {/* Guide rings */}
      {rings.map((scale) => {
        const ringPoints = AXES.map((axis) => toXY(axis.angle, radius * scale));
        const ringPath = ringPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return (
          <path
            key={scale}
            d={ringPath}
            fill="none"
            stroke="var(--border)"
            strokeWidth={scale === 1.0 ? 1.5 : 0.8}
            opacity={0.5}
          />
        );
      })}

      {/* Axis lines */}
      {AXES.map((axis) => {
        const end = toXY(axis.angle, radius);
        return (
          <line
            key={axis.key}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="var(--border)"
            strokeWidth={0.8}
            opacity={0.4}
          />
        );
      })}

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="var(--accent)"
        fillOpacity={0.25}
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={AXES[i].key}
          cx={p.x}
          cy={p.y}
          r={3.5}
          fill="var(--accent)"
        />
      ))}

      {/* Axis labels */}
      {AXES.map((axis) => {
        const labelR = radius + 18;
        const pos = toXY(axis.angle, labelR);
        const score = scores[axis.key];
        return (
          <text
            key={`label-${axis.key}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-secondary)"
            fontSize={10}
            fontFamily="var(--font-body)"
            fontWeight={500}
          >
            {axis.label} ({score})
          </text>
        );
      })}
    </svg>
  );
}
