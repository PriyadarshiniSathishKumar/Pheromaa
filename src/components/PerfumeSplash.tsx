
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerfumeSplashProps {
  isActive: boolean;
  color?: string;
  onComplete?: () => void;
}

const PerfumeSplash: React.FC<PerfumeSplashProps> = ({ 
  isActive, 
  color = "#c59dff", 
  onComplete 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    rotation: number;
    delay: number;
    duration: number;
    dropletForm: string;
  }>>([]);
  
  useEffect(() => {
    if (isActive) {
      // Create more realistic liquid splashes
      const newParticles = Array.from({ length: 35 }, (_, i) => {
        const radius = Math.random() > 0.7 ? 
          Math.random() * 80 + 20 :  // Larger droplets
          Math.random() * 25 + 5;    // Smaller droplets
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 70 + 30;
        
        // Create irregular droplet shapes
        const dropletForm = `${40 + Math.random() * 20}% ${50 + Math.random() * 20}% ${30 + Math.random() * 40}% ${40 + Math.random() * 30}%`;
        
        return {
          id: i,
          x: 50 + Math.cos(angle) * distance,  // Center splash and spread outward
          y: 50 + Math.sin(angle) * distance,   
          size: radius,
          opacity: Math.random() * 0.4 + 0.6,
          rotation: Math.random() * 360,
          delay: Math.random() * 0.3,
          duration: Math.random() * 0.8 + 1.2,
          dropletForm
        };
      });
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 1800);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  // Add splash sounds for more realism
  useEffect(() => {
    if (isActive) {
      // You could add actual sound here if desired
      console.log("Splash effect triggered");
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className="fixed inset-0 pointer-events-none z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Center splash impact */}
          <motion.div
            className="absolute rounded-full"
            style={{
              backgroundColor: adjustColorOpacity(color, 0.2),
              width: 100,
              height: 100,
              left: "calc(50% - 50px)",
              top: "calc(50% - 50px)",
              boxShadow: `0 0 40px 10px ${adjustColorOpacity(color, 0.2)}`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 2], opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          
          {/* Liquid particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                backgroundColor: adjustColorOpacity(color, particle.opacity),
                width: particle.size,
                height: particle.size,
                boxShadow: `0 0 8px 2px ${adjustColorOpacity(color, particle.opacity * 0.5)}`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                borderRadius: particle.dropletForm
              }}
              initial={{ 
                scale: 0, 
                rotate: 0,
                opacity: 0,
                x: 0,
                y: 0
              }}
              animate={{ 
                scale: [0, 1, 0.8], 
                rotate: [0, particle.rotation],
                opacity: [0, particle.opacity, 0],
                x: [0, (Math.random() - 0.5) * 40],
                y: [0, (Math.random() - 0.5) * 40]
              }}
              transition={{ 
                duration: particle.duration, 
                ease: "easeOut",
                delay: particle.delay
              }}
            />
          ))}
          
          {/* Mist effect */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`mist-${i}`}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, ${adjustColorOpacity(color, 0.6)} 0%, ${adjustColorOpacity(color, 0)} 70%)`,
                width: 80 + Math.random() * 120,
                height: 80 + Math.random() * 120,
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
                filter: 'blur(8px)'
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [0.5, 1.2, 1.5],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
              }}
              transition={{ 
                duration: 1.5 + Math.random(), 
                ease: "easeOut",
                delay: Math.random() * 0.4
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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

export default PerfumeSplash;
