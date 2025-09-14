
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Droplets } from 'lucide-react';

// Optimized animated particles component
const AnimatedParticles = React.memo(() => {
  // Reduced particle count for better performance
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 3 + 4
    })), []
  );

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-perfume-pink/20"
          style={{
            width: particle.size + 'px',
            height: particle.size + 'px',
            left: particle.left + '%',
            top: particle.top + '%',
            filter: 'blur(1px)',
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [0, -80],
            opacity: [0, 0.4, 0],
            scale: [1, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: particle.animationDuration,
            ease: "easeOut",
            delay: particle.animationDelay
          }}
        />
      ))}
    </div>
  );
});

const HeroSection: React.FC = React.memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Optimized transform values with will-change CSS hint
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  
  // Memoized word animation function
  const animateWord = useCallback((word: string) => {
    return (
      <div className="inline-block">
        {word.split('').map((letter, index) => (
          <motion.span
            key={index}
            className="maximize-letter inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5 + (index * 0.05),
              duration: 0.5,
              type: "spring",
              stiffness: 120
            }}
            whileHover={{ 
              scale: 1.4, 
              color: '#ff57a8',
              textShadow: "0 0 15px rgba(255, 87, 168, 0.8)",
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    );
  }, []);
  
  return (
    <motion.section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ scale, opacity, willChange: 'transform, opacity' }}
    >
      {/* Background with optimized loading */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <motion.img
            src="/lovable-uploads/45d25ded-2f0f-4e7f-bbf4-804fe0d8de69.png"
            alt="Elegant Perfume"
            className="w-full h-full object-cover"
            loading="eager" // Prioritize hero image loading
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{ y, willChange: 'transform' }}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Optimized gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90" />
          
          {/* Optimized particles component */}
          <AnimatedParticles />
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-20 text-center relative z-10">
        <motion.div 
          className="w-full max-w-4xl mx-auto"
          style={{ willChange: 'transform' }}
        >
          <AnimatePresence>
            {imageLoaded && (
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider text-white leading-tight"
              >
                {animateWord("BELIEVE")} <br /> 
                <motion.span 
                  className="water-text pink-water-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.5 }}
                >
                  IN DREAMS
                </motion.span>
              </motion.h1>
            )}
          </AnimatePresence>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-lg text-gray-300 mx-auto"
          >
            Step into a world of captivating aromas with PHEROMA, where each fragrance is crafted to evoke emotion, inspire memories, and define your essence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 space-x-4 flex justify-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 relative overflow-hidden group"
            >
              <Link to="/products" data-cursor-text="Discover">
                <motion.span 
                  className="relative z-10 flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Discover Collection</span>
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Droplets className="ml-2 w-4 h-4 opacity-70" />
                  </motion.div>
                </motion.span>
                <motion.span 
                  className="absolute inset-0 bg-perfume-pink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              <Link to="/about" data-cursor-text="Our Story">
                <motion.span 
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Our Story</span>
                  <motion.span 
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="ml-2"
                  >
                    <Droplets className="w-4 h-4 opacity-70" />
                  </motion.span>
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Optimized scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={imageLoaded ? { 
          opacity: 0.8, 
          y: [0, 8, 0] 
        } : { opacity: 0 }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut",
          delay: 1
        }}
        style={{ willChange: 'transform' }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2"
          whileHover={{ scale: 1.1, borderColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <motion.div 
            className="w-1 h-2 bg-white/80 rounded-full"
            animate={{ 
              y: [0, 4, 0]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
});

export default HeroSection;
