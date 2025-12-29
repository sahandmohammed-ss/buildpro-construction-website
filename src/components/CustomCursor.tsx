'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [cursorClass, setCursorClass] = useState<string>('');
  const [cursorColor, setCursorColor] = useState<string>('');
  const [cursorBlendMode, setCursorBlendMode] = useState<string>('');
  
  // Use MotionValues for direct DOM updates (no re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the circle (cursor)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Tighter spring for the dot (follower)
  const dotSpringConfig = { damping: 35, stiffness: 1500, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update MotionValues directly
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      
      setIsPointer(isClickable);

      // Check for custom cursor attributes
      const customClass = target.closest('[data-cursor-class]')?.getAttribute('data-cursor-class') || '';
      const customColor = target.closest('[data-cursor-color]')?.getAttribute('data-cursor-color') || '';
      const customBlend = target.closest('[data-cursor-blend-mode]')?.getAttribute('data-cursor-blend-mode') || '';
      
      setCursorClass(customClass);
      setCursorColor(customColor);
      setCursorBlendMode(customBlend);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div 
        className={`${styles.cursor} ${cursorClass ? styles[cursorClass] : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: cursorColor || undefined,
          mixBlendMode: (cursorBlendMode as any) || undefined
        }}
        animate={{ 
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div 
        className={`${styles.follower} ${cursorClass ? styles[cursorClass] : ''}`}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: cursorColor || undefined,
          mixBlendMode: (cursorBlendMode as any) || undefined
        }}
        animate={{ 
          opacity: isPointer ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
