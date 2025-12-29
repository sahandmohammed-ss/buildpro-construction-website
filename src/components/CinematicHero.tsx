'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './CinematicHero.module.css';

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    // Ensure fonts and content are loaded before showing animations
    setIsReady(true);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className={styles.hero}>
      <motion.div style={{ y, opacity }} className={styles.bgContainer}>
        <div className={styles.bgGradient} />
        <div className={styles.gridOverlay} />
      </motion.div>

      <div className={styles.content}>
        <motion.h1 
          className={styles.title}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          WE BUILD <br />
          <span className={styles.accent}>LEGACIES</span>
        </motion.h1>

        <motion.p 
          className={styles.subtitle}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          BuildPro Construction — Where architectural vision meets engineering excellence. 
          We transform bold ideas into timeless structures that define skylines. <br />
          Architecting the future, one legacy at a time.
        </motion.p>
      </div>
      
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className={styles.line} />
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
}
