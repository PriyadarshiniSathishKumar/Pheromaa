
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
  }>>([]);
  
  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        opacity: Math.random() * 0.6 + 0.4,
        rotation: Math.random() * 360,
      }));
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className="fixed inset-0 pointer-events-none z-[9998]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: color,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              initial={{ 
                scale: 0, 
                rotate: 0,
                opacity: particle.opacity
              }}
              animate={{ 
                scale: [0, 1, 0.8], 
                rotate: [0, particle.rotation],
                opacity: [0, particle.opacity, 0] 
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut" 
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PerfumeSplash;
