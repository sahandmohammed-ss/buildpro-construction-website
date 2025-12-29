'use client';

import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';
import testimonialsData from '../data/testimonials.json';

// Duplicate data to create seamless loop
// Duplicate data twice to create seamless loop (3 sets)
const marqueeData = [
  ...testimonialsData.testimonials, 
  ...testimonialsData.testimonials,
  ...testimonialsData.testimonials
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>Client Voices</h2>
          <p className={styles.subtitle}>Trusted by industry leaders</p>
        </motion.div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.gradientLeft} />
          <div className={styles.gradientRight} />
          
          <motion.div 
            className={styles.track}
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 60 
            }}
          >
            {marqueeData.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className={styles.card}>
                <div className={styles.stars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <blockquote className={styles.quote}>
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className={styles.author}>
                  <div className={styles.avatarPlaceholder}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className={styles.name}>{testimonial.author}</p>
                    <p className={styles.position}>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
