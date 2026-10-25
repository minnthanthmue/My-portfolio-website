import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export const sectionContainerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}

/**
 * AnimatedSection: Subtle fade-in and slide-up animation via Framer Motion 'whileInView'.
 * Slide-up of 16px, 250ms duration, triggered once as the section enters the viewport.
 * Fully respects prefers-reduced-motion.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  amount = 0.12,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedSectionItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={sectionItemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
