'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './ServiceAccordion.module.css';

const services = [
  {
    id: "01",
    title: "Architectural Design",
    description: "From concept to blueprint, we craft spaces that inspire. Our design philosophy merges functionality with avant-garde aesthetics."
  },
  {
    id: "02",
    title: "Construction Management",
    description: "Precision execution. We oversee every bolt and beam, ensuring your project is delivered on time and beyond expectations."
  },
  {
    id: "03",
    title: "Interior Renovation",
    description: "Transforming existing structures into modern masterpieces. We breathe new life into old bones."
  },
  {
    id: "04",
    title: "Sustainable Engineering",
    description: "Building for the future with eco-conscious materials and energy-efficient systems. Green is the new gold."
  }
];

export default function ServiceAccordion() {
  const [expanded, setExpanded] = useState<string | null>("01");

  return (
    <section className={styles.section} id="services">
      <div className="container">
        <h2 className={styles.heading}>OUR EXPERTISE</h2>
        
        <div className={styles.list}>
          {services.map((service) => (
            <div 
              key={service.id} 
              className={styles.item}
              onClick={() => setExpanded(expanded === service.id ? null : service.id)}
            >
              <div className={styles.header}>
                <span className={styles.id}>{service.id}</span>
                <h3 className={styles.title}>{service.title}</h3>
                <span className={styles.icon}>
                  {expanded === service.id ? <Minus /> : <Plus />}
                </span>
              </div>
              
              <AnimatePresence>
                {expanded === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.contentWrapper}
                  >
                    <p className={styles.description}>{service.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
