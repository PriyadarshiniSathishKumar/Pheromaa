
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollSplashEffect = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showSplash, setShowSplash] = useState(false);
  const controls = useAnimation();
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      // Trigger splash on certain scroll thresholds
      if (position > scrollPosition + 500) {
        setShowSplash(true);
        setScrollPosition(position);
        
        // Auto-hide after animation
        setTimeout(() => {
          setShowSplash(false);
        }, 1500);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);
  
  // Animate particles when splash is triggered
  useEffect(() => {
    if (showSplash) {
      controls.start(i => ({
        opacity: [0, 0.8, 0],
        y: [0, -100 * Math.random()],
        x: [0, (Math.random() - 0.5) * 200],
        scale: [0, 1, 0],
        rotate: [0, Math.random() * 360],
        transition: { 
          duration: 1.5,
          times: [0, 0.5, 1],
          ease: "easeOut",
          delay: i * 0.04
        }
      }));
    }
  }, [controls, showSplash]);
  
  // Don't render if no splash
  if (!showSplash) return null;

  // Create splash particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    color: i % 3 === 0 ? '#ff9db0' : i % 3 === 1 ? '#a3ff9d' : '#c59dff'
  }));
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {particles.map((particle, i) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          custom={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={controls}
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            bottom: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)'
          }}
        />
      ))}
    </div>
  );
};

export default ScrollSplashEffect;
