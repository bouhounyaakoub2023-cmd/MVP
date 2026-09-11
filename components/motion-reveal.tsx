'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HeroVisual({ imageUrl }: { imageUrl: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 90]);
  const scale = useTransform(scrollY, [0, 900], [1, 1.055]);
  const opacity = useTransform(scrollY, [0, 750], [1, 0.62]);

  return (
    <motion.div className="hero-visual" style={{ y, scale, opacity }} aria-hidden="true">
      <div className="hero-visual-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="hero-visual-grid" />
      <div className="hero-visual-scan" />
      <div className="hero-visual-label label-top">LIVE / INDUSTRIAL SIGNALS</div>
      <div className="hero-visual-label label-bottom">DATA → INTELLIGENCE → ACTION</div>
      <div className="hero-visual-node node-a" />
      <div className="hero-visual-node node-b" />
      <div className="hero-visual-node node-c" />
    </motion.div>
  );
}
