'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import styles from './projects.module.css';
import PageTransition from '@/components/PageTransition';

const allProjects = [
  {
    id: 1,
    title: "Obsidian Tower",
    category: "Commercial",
    image: "/images/architecture-landscape.jpg",
  },
  {
    id: 2,
    title: "Bronze Residence",
    category: "Residential",
    image: "/images/luxury-house-9-1.jpg",
  },
  {
    id: 3,
    title: "Void Bridge",
    category: "Infrastructure",
    image: "/images/exterior-of-the-building-1.jpg",
  },
  {
    id: 4,
    title: "Azure Marina",
    category: "Marine",
    image: "/images/051Edited-no-address-1200x790.jpg",
  },
  {
    id: 5,
    title: "Carbon Hub",
    category: "Industrial",
    image: "/images/rosie-steggles-vCa97LyZgOg-unsplash.jpg",
  },
  {
    id: 6,
    title: "Zenith Spire",
    category: "Commercial",
    image: "/images/daniel-chen-cNaEqXSsZ0k-unsplash.jpg",
  }
];

const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.category)))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);

  return (
    <PageTransition>
      <main className={styles.main}>
        <div className={styles.navWrapper}>
          <FloatingNav />
        </div>

        <div className={styles.container}>
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.title}>All Projects</h1>
            <p className={styles.subtitle}>A complete archive of our architectural journey.</p>
            
            <div className={styles.filterContainer}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`${styles.filterButton} ${activeCategory === category ? styles.activeFilter : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            layout
            className={styles.grid}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={styles.projectWrapper}
                >
                  <Link href={`/projects/${project.id}`} className={styles.card} scroll={true}>
                    <div className={styles.imageWrapper}>
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={project.id <= 6}
                      />
                    </div>
                    <div className={styles.cardOverlay}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <span className={styles.projectCategory}>{project.category}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
