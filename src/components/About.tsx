'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>Who We Are</span>
          <h2 className={styles.title}>Architecting the <span style={{ color: 'var(--accent-bronze)' }}>Future</span></h2>
          <p className={styles.description}>
            BuildPro is more than a construction firm; we are visionaries dedicated to reshaping skylines and redefining living spaces. With over two decades of excellence, we blend cutting-edge technology with timeless craftsmanship to deliver projects that stand the test of time.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>25+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>100+</span>
              <span className={styles.statLabel}>Projects Completed</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image 
            src="/images/architecture-landscape.jpg" 
            alt="BuildPro Architecture" 
            className={styles.image}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className={styles.overlay} />
        </motion.div>
      </div>
    </section>
  );
}
