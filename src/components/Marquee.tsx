'use client';

import { motion } from 'framer-motion';
import styles from './Marquee.module.css';

export default function Marquee() {
  return (
    <section className={styles.section}>
      <div className={styles.track}>
        <motion.div 
          className={styles.content}
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 
          }}
        >
          <span>EXCELLENCE</span>
          <span className={styles.separator}>•</span>
          <span>PRECISION</span>
          <span className={styles.separator}>•</span>
          <span>INNOVATION</span>
          <span className={styles.separator}>•</span>
          <span>QUALITY</span>
          <span className={styles.separator}>•</span>
          {/* Duplicate for seamless loop */}
          <span>EXCELLENCE</span>
          <span className={styles.separator}>•</span>
          <span>PRECISION</span>
          <span className={styles.separator}>•</span>
          <span>INNOVATION</span>
          <span className={styles.separator}>•</span>
          <span>QUALITY</span>
          <span className={styles.separator}>•</span>
        </motion.div>
      </div>
    </section>
  );
}
