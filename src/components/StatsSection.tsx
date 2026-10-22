import React from 'react';
import { STATS } from '../data/mockData';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D, ScrollCard3D } from './motion';
import { CountUpNumber } from './CountUpNumber';

export const StatsSection: React.FC = React.memo(() => {
  return (
    <ScrollReveal as="section" id="stats" className="py-16 md:py-24 font-[var(--font-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <Scroll3D preset="section" className="w-full">
          <div className="relative group/stats bg-[var(--color-white)] rounded-[28px] border-y border-x-transparent border-[var(--color-border)] p-6 sm:p-12 shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-500 ease-out overflow-hidden">
            {/* Ambient subtle glow background effect */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover/stats:opacity-100 opacity-40" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover/stats:opacity-100 opacity-40" />

            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
              {STATS.map((stat, i) => {
                return (
                  <ScrollRevealItem
                    key={stat.label}
                    index={i}
                    delay={60 + i * 80}
                    className={`pt-6 sm:pt-0 ${
                      i !== 0 ? 'sm:pl-8 lg:pl-10' : ''
                    } cursor-default`}
                  >
                    <ScrollCard3D index={i} total={STATS.length}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-70" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]/80 font-mono">
                          Metric 0{i + 1}
                        </span>
                      </div>

                      <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-gold)] tabular-nums leading-[1.15] inline-flex items-baseline gap-1">
                        <CountUpNumber value={stat.value} delay={i * 120} duration={1600} />
                      </div>

                      <div className="mt-2 text-sm text-[var(--color-text)] font-medium font-[var(--font-sans)]">
                        {stat.label}
                      </div>
                    </ScrollCard3D>
                  </ScrollRevealItem>
                );
              })}
            </div>
          </div>
        </Scroll3D>
      </div>
    </ScrollReveal>
  );
});

export default StatsSection;
