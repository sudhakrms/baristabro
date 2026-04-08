import { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { SectionWrapper } from '../components/SectionWrapper';
import { TasteRadar } from '../components/TasteRadar';
import { flavorWheel, type FlavorNode } from '../data/flavorWheel';

interface SunburstNode extends d3.HierarchyRectangularNode<FlavorNode> {}

export function FlavorWheel() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<FlavorNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = Math.min(containerRef.current.offsetWidth, 520);
        setDimensions({ width: w, height: w });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleSelect = useCallback((node: FlavorNode | null) => {
    setSelected(node);
  }, []);

  // D3 sunburst rendering
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const radius = Math.min(width, height) / 2;

    const root = d3
      .hierarchy(flavorWheel)
      .sum(() => 1)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    const partition = d3.partition<FlavorNode>().size([2 * Math.PI, radius]);
    const partitioned = partition(root);

    const arc = d3
      .arc<SunburstNode>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle(0.01)
      .padRadius(radius / 2)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1 - 1);

    const g = svg
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
      .append('g');

    // Center label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'var(--text-primary)')
      .attr('font-family', 'var(--font-heading)')
      .attr('font-size', Math.max(12, radius * 0.08))
      .attr('font-weight', '700')
      .text('Coffee');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.8em')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-family', 'var(--font-heading)')
      .attr('font-size', Math.max(10, radius * 0.06))
      .text('Flavors');

    const paths = g
      .selectAll('path')
      .data(partitioned.descendants().filter((d) => d.depth > 0))
      .join('path')
      .attr('d', arc as never)
      .attr('fill', (d) => d.data.color ?? '#ccc')
      .attr('stroke', 'var(--bg-primary)')
      .attr('stroke-width', 1.5)
      .attr('cursor', 'pointer')
      .attr('opacity', 0.9)
      .attr('role', 'button')
      .attr('tabindex', '0')
      .attr('aria-label', (d) => d.data.name)
      .on('click', (_, d) => handleSelect(d.data))
      .on('keydown', (e: KeyboardEvent, d) => {
        if (e.key === 'Enter' || e.key === ' ') handleSelect(d.data);
      })
      .on('mouseenter', function () {
        d3.select(this).attr('opacity', 1).attr('stroke-width', 2.5);
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', 0.9).attr('stroke-width', 1.5);
      });

    // Hover title
    paths.append('title').text((d) => d.data.name);

    // Arc labels for inner ring segments with enough angular space
    g.selectAll('text.arc-label')
      .data(partitioned.descendants().filter((d) => d.depth === 1 && d.x1 - d.x0 > 0.3))
      .join('text')
      .attr('class', 'arc-label')
      .attr('transform', (d) => {
        const angle = ((d.x0 + d.x1) / 2) * (180 / Math.PI) - 90;
        const r = (d.y0 + d.y1) / 2;
        return `rotate(${angle}) translate(${r},0) rotate(${angle > 90 ? 180 : 0})`;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', (d) => (isLightColor(d.data.color ?? '#ccc') ? '#2B1810' : '#FEFCF9'))
      .attr('font-size', Math.max(8, radius * 0.045))
      .attr('font-family', 'var(--font-body)')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none')
      .text((d) => d.data.name);

    return () => {
      svg.selectAll('*').remove();
    };
  }, [dimensions, handleSelect]);

  // Example taste scores for demo
  const demoScores = { acidity: 7, body: 5, sweetness: 6, bitterness: 4, aftertaste: 7 };

  return (
    <SectionWrapper id="flavor-wheel">
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
        Flavor Wheel
      </h2>
      <p className="mb-10 max-w-2xl" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-small)' }}>
        The SCA Coffee Taster&apos;s Flavor Wheel — tap any segment to explore flavor categories and
        subcategories.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sunburst */}
        <div ref={containerRef} className="flex-1 w-full max-w-[520px] mx-auto lg:mx-0">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            style={{ maxHeight: dimensions.height }}
            role="img"
            aria-label="SCA Flavor Wheel sunburst chart"
          />
        </div>

        {/* Detail panel */}
        <div className="flex-1 w-full lg:max-w-sm">
          {selected ? (
            <div
              className="p-5 rounded-xl"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: 'var(--card-border)',
                borderRadius: 'var(--card-radius)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-5 h-5 rounded-full shrink-0"
                  style={{ backgroundColor: selected.color }}
                  aria-hidden
                />
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                >
                  {selected.name}
                </h3>
              </div>
              {selected.description && (
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selected.description}
                </p>
              )}
              {selected.children && selected.children.length > 0 && (
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Subcategories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.children.map((child) => (
                      <button
                        key={child.name}
                        onClick={() => setSelected(child)}
                        className="px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer"
                        style={{
                          backgroundColor: child.color,
                          color: isLightColor(child.color ?? '#ccc') ? '#2B1810' : '#FEFCF9',
                          border: 'none',
                        }}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="p-5 rounded-xl text-center"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: 'var(--card-border)',
                borderRadius: 'var(--card-radius)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Tap a segment on the wheel to explore its flavor profile.
              </p>
            </div>
          )}

          {/* Taste Radar demo */}
          <div className="mt-6">
            <h4
              className="text-sm font-semibold mb-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              Taste Radar — Sample Profile
            </h4>
            <div className="flex justify-center">
              <TasteRadar scores={demoScores} size={200} />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
