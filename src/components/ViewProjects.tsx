'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import styles from './ViewProjects.module.css';

const featuredProjects = [
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
  }
];

export default function ViewProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Work</h2>
          <p className={styles.subtitle}>A showcase of our finest architectural achievements.</p>
        </div>

        <div 
          className={styles.sliderWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.slider}>
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
              >
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  className={styles.image}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className={styles.overlay}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.category}>{project.category}</span>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <motion.div 
                className={styles.progressBar}
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "0%" : "100%" }}
                transition={{ 
                  duration: 5, 
                  ease: "linear",
                  repeat: 0
                }}
                key={currentIndex} // Reset animation on slide change
              />
            </div>
          </div>

          <div className={styles.thumbnails}>
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                className={`${styles.thumbnailBtn} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View ${project.title}`}
              >
                <Image src={project.image} alt={project.title} className={styles.thumbImage} width={100} height={60} />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/projects">
            <Button variant="primary">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
