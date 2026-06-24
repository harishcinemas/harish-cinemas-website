import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight";
  key?: React.Key;
}

export default function AnimatedSection({ children, className = "", delay = 0, variant = "fadeUp" }: AnimatedSectionProps) {
  const baseVariants = {
    fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    scaleIn: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
    slideLeft: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
    slideRight: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={baseVariants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
