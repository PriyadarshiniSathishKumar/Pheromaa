
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollSplashEffect = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showSplash, setShowSplash] = useState(false);
  const [splashPosition, setSplashPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const threshold = 200; // Lower threshold for more frequent splashes
      
      // Trigger splash on scroll thresholds
      if (position > scrollPosition + threshold) {
        // Calculate a somewhat random but realistic splash position
        const viewportWidth = window.innerWidth;
        const randomX = Math.random() * (viewportWidth * 0.8) + (viewportWidth * 0.1);
        
        setSplashPosition({
          x: randomX,
          y: window.innerHeight * 0.5 + Math.random() * 100
        });
        
        setShowSplash(true);
        setScrollPosition(position);
        
        // Auto-hide after animation
        setTimeout(() => {
          setShowSplash(false);
        }, 1800);
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
        opacity: [0, 0.9, 0],
        y: [0, -30 * Math.random() - 20, -50 * Math.random() - 30],
        x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 80],
        scale: [0, 1 + Math.random() * 0.5, 0],
        rotate: [0, Math.random() * 360],
        borderRadius: ["50%", `${40 + Math.random() * 20}% ${50 + Math.random() * 20}% ${30 + Math.random() * 40}% ${40 + Math.random() * 30}%`],
        transition: { 
          duration: 1.5 + Math.random() * 0.5,
          ease: "easeOut",
          delay: i * 0.05
        }
      }));
    }
  }, [controls, showSplash]);
  
  // Don't render if no splash
  if (!showSplash) return null;

  // Create splash particles - more particles for realism
  const mainSplashColor = getRandomSplashColor();
  
  // Main droplets
  const droplets = Array.from({ length: 10 }, (_, i) => ({
    id: `droplet-${i}`,
    size: Math.random() * 15 + 10,
    color: mainSplashColor,
    xOffset: (Math.random() - 0.5) * 60,
    yOffset: Math.random() * -20,
    delay: Math.random() * 0.2
  }));
  
  // Splash particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: `particle-${i}`,
    size: Math.random() * 25 + 5,
    color: adjustColorOpacity(mainSplashColor, 0.6 + Math.random() * 0.3),
    initialX: (Math.random() - 0.5) * 40,
    initialY: Math.random() * 20
  }));
  
  return (
    <>
      {/* Main splash source */}
      <div className="fixed pointer-events-none z-[9998]" style={{
        left: splashPosition.x,
        top: splashPosition.y
      }}>
        {/* Main droplets that fall down */}
        {droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            className="absolute rounded-full liquid-droplet"
            style={{
              backgroundColor: droplet.color,
              width: droplet.size,
              height: droplet.size * 1.2,
              left: droplet.xOffset,
              top: droplet.yOffset,
              '--droplet-x': `${(Math.random() - 0.5) * 20}px`
            } as React.CSSProperties}
            initial={{ opacity: 0, y: -20, scale: 0.2 }}
            animate={{
              opacity: [0, 0.9, 0],
              y: [-20, 60],
              scale: [0.2, 1, 0.5],
              borderRadius: ["50% 50% 50% 50%", "40% 60% 60% 40%", "50% 40% 60% 50%"]
            }}
            transition={{ 
              duration: 1 + Math.random() * 0.8, 
              ease: "easeIn",
              delay: droplet.delay
            }}
          />
        ))}
        
        {/* Splash impact circle */}
        <motion.div
          className="absolute rounded-full splash-impact"
          style={{
            backgroundColor: adjustColorOpacity(mainSplashColor, 0.3),
            width: 40,
            height: 40,
            left: -20,
            top: 10,
            boxShadow: `0 0 20px 5px ${adjustColorOpacity(mainSplashColor, 0.2)}`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5], opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
      </div>
      
      {/* Splash particles that go in all directions */}
      <div className="fixed inset-0 pointer-events-none z-[9997]">
        {particles.map((particle, i) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            custom={i}
            initial={{ 
              opacity: 0, 
              scale: 0,
              left: splashPosition.x + particle.initialX,
              top: splashPosition.y + particle.initialY
            }}
            animate={controls}
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              boxShadow: `0 0 10px 2px ${adjustColorOpacity(particle.color, 0.3)}`
            }}
          />
        ))}
      </div>
    </>
  );
};

// Helper function to get a random splash color from the brand colors
function getRandomSplashColor() {
  const colors = [
    '#ff9db0', // Pink
    '#a3ff9d', // Green
    '#c59dff', // Purple
    '#d4af37'  // Gold
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to adjust color opacity
function adjustColorOpacity(color: string, opacity: number) {
  if (color.startsWith('#') && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

export default ScrollSplashEffect;
