import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface Scroll3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  preset?: 'section' | 'hero' | 'card' | 'image' | 'layer' | 'subtle';
  perspective?: number;
  intensity?: 'subtle' | 'medium' | 'gentle';
  rotateXRange?: [number, number, number]; // [entry, center, exit]
  rotateYRange?: [number, number, number];
  scaleRange?: [number, number, number];
  yRange?: [number, number, number];
  opacityRange?: [number, number, number];
  className?: string;
  as?: any;
  depth?: number; // for layer depth offset
}

export const Scroll3D: React.FC<Scroll3DProps> = ({
  children,
  preset = 'section',
  perspective = 1200,
  intensity = 'subtle',
  rotateXRange,
  rotateYRange,
  scaleRange,
  yRange,
  opacityRange,
  className = '',
  as: Component = motion.div,
  depth = 0,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isInView, setIsInView] = React.useState(true);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track scroll progress of this container across viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: preset === 'hero' ? ['start start', 'end start'] : ['start end', 'end start'],
  });

  // Spring configuration for buttery organic motion interpolation
  const springConfig = {
    damping: 26,
    stiffness: 110,
    mass: 0.45,
    restDelta: 0.001,
  };

  // Determine preset ranges
  const mult = intensity === 'gentle' ? 0.6 : intensity === 'medium' ? 1.4 : 1.0;

  let rx = rotateXRange;
  let ry = rotateYRange;
  let sc = scaleRange;
  let yr = yRange;
  let op = opacityRange;

  if (preset === 'hero') {
    rx = rx || [0, 1.5 * mult, 3 * mult];
    sc = sc || [1, 0.985, 0.965];
    yr = yr || [0, 25 * mult, 60 * mult];
    op = op || [1, 0.95, 0.85];
  } else if (preset === 'card') {
    rx = rx || [3 * mult, 0, -2 * mult];
    sc = sc || [0.97, 1, 0.98];
    yr = yr || [30 * mult, 0, -25 * mult];
    op = op || [0.85, 1, 0.9];
  } else if (preset === 'image') {
    rx = rx || [2.5 * mult, 0, -2 * mult];
    sc = sc || [0.98, 1.015, 1.0];
    yr = yr || [35 * mult, 0, -35 * mult];
    op = op || [0.9, 1, 0.92];
  } else if (preset === 'layer') {
    const layerFactor = depth !== 0 ? depth : 0.1;
    rx = rx || [1.5 * mult * layerFactor, 0, -1.5 * mult * layerFactor];
    sc = sc || [1 - 0.02 * layerFactor, 1, 1 + 0.02 * layerFactor];
    yr = yr || [50 * layerFactor * mult, 0, -50 * layerFactor * mult];
    op = op || [0.92, 1, 0.95];
  } else if (preset === 'subtle') {
    rx = rx || [1.2 * mult, 0, -1 * mult];
    sc = sc || [0.99, 1, 0.99];
    yr = yr || [15 * mult, 0, -15 * mult];
    op = op || [0.95, 1, 0.95];
  } else {
    // default 'section'
    rx = rx || [2.2 * mult, 0, -1.8 * mult];
    sc = sc || [0.975, 1, 0.985];
    yr = yr || [25 * mult, 0, -25 * mult];
    op = op || [0.9, 1, 0.92];
  }

  // Raw MotionValues
  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [`${rx[0]}deg`, `${rx[1]}deg`, `${rx[2]}deg`]
  );
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], sc);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], yr);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 1], op);

  // Apply spring physics to raw values for smooth settling
  const springRotateX = useSpring(rawRotateX, springConfig);
  const springScale = useSpring(rawScale, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springOpacity = useSpring(rawOpacity, springConfig);

  // When user prefers reduced motion or element is off-screen, disable active 3D transforms
  const motionStyle = prefersReduced || !isInView
    ? { ...style }
    : {
        ...style,
        rotateX: springRotateX,
        scale: springScale,
        y: springY,
        opacity: springOpacity,
        transformPerspective: perspective,
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform, opacity',
      };

  const MotionComponent = Component as typeof motion.div;

  return (
    <div
      ref={containerRef}
      style={{ perspective: `${perspective}px` }}
      className={`relative ${className}`}
      {...props}
    >
      <MotionComponent style={motionStyle} className="outline-none border-none ring-0">
        {children}
      </MotionComponent>
    </div>
  );
};
