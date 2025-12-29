'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Don't show on home page (SPA)
  if (pathname === '/') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        cursor: 'pointer',
      }}
      onClick={scrollToTop}
    >
      {/* Progress Circle Container */}
      <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Background Circle */}
        <svg width="60" height="60" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          <circle
            cx="30"
            cy="30"
            r="28"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
            fill="rgba(0, 0, 0, 0.8)"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="30"
            cy="30"
            r="28"
            stroke="var(--accent-bronze)"
            strokeWidth="2"
            fill="none"
            pathLength="1"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp size={24} color="#fff" />
      </div>
    </motion.div>
  );
}
