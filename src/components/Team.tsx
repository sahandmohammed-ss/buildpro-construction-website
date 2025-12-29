'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Team.module.css';
import teamData from '../data/team.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as any
    }
  }
};

export default function Team() {
  return (
    <section className={styles.section} id="team">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-10%" }}
          className={styles.header}
        >
          <h2 className={styles.title}>Our Team</h2>
          <p className={styles.subtitle}>The minds behind the masterpieces</p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {teamData.team.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  quality={85}
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
