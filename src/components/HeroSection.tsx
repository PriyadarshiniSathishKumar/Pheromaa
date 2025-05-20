
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Droplets } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Transform values based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 0.3], [0, -5]);
  
  // Word animations for title
  const animateWord = (word: string) => {
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
  };
  
  return (
    <motion.section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ scale, opacity }}
    >
      {/* Background with the elegant perfume image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <motion.img
            src="/lovable-uploads/45d25ded-2f0f-4e7f-bbf4-804fe0d8de69.png"
            alt="Elegant Perfume"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 2 }}
            style={{ y }}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-perfume-pink/30"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  filter: 'blur(1px)',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  y: [0, -(Math.random() * 100 + 50)],
                  opacity: [0, 0.6, 0],
                  scale: [1, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 5 + 5,
                  ease: "easeOut",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-20 text-center relative z-10">
        <motion.div 
          className="w-full max-w-4xl mx-auto"
          style={{ rotate }}
        >
          <AnimatePresence>
            {imageLoaded && (
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider text-white leading-tight"
              >
                {animateWord("BELIEVE")} <br /> 
                <motion.span 
                  className="water-text pink-water-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 2 }}
                >
                  IN DREAMS
                </motion.span>
              </motion.h1>
            )}
          </AnimatePresence>
          
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 text-lg text-gray-300 mx-auto"
          >
            Step into a world of captivating aromas with PHEROMA, where each fragrance is crafted to evoke emotion, inspire memories, and define your essence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.1 }}
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
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={imageLoaded ? { 
          opacity: 1, 
          y: [0, 10, 0] 
        } : { opacity: 0 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5, 
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          whileHover={{ scale: 1.2, borderColor: "#ff57a8" }}
        >
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ 
              y: [0, 6, 0],
              backgroundColor: ["#ffffff", "#ff57a8", "#ffffff"]
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
