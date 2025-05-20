
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Droplets } from 'lucide-react';

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  
  useEffect(() => {
    if (imageLoaded) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      });
      
      // Show splash effect after a delay when page loads
      setTimeout(() => {
        setShowSplash(true);
        
        // Hide splash after animation completes
        setTimeout(() => {
          setShowSplash(false);
        }, 2500);
      }, 800);
    }
  }, [controls, imageLoaded]);

  // Function to trigger splash effect on button hover
  const handleButtonHover = () => {
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 2500);
  };
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with the elegant perfume image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <motion.img
            src="/lovable-uploads/45d25ded-2f0f-4e7f-bbf4-804fe0d8de69.png"
            alt="Elegant Perfume"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 2 }}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90"></div>
        </div>
      </div>
      
      {/* Liquid splash effect */}
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Center perfume bottle image */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1],
                y: [20, 0],
                opacity: [0, 1]
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img 
                src="/lovable-uploads/b6410b8a-f54a-4092-a1ec-439b37c435b6.png" 
                alt="Perfume Splash"
                className="w-[300px] h-auto"
              />
            </motion.div>
            
            {/* Liquid splash particles */}
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div
                key={`splash-${index}`}
                className="absolute"
                style={{
                  left: `${40 + Math.random() * 20}%`,
                  top: `${40 + Math.random() * 20}%`,
                  background: index % 2 === 0 ? 'rgba(255, 230, 0, 0.8)' : 'rgba(50, 50, 50, 0.8)',
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  borderRadius: `${40 + Math.random() * 60}% ${30 + Math.random() * 70}% ${50 + Math.random() * 50}% ${40 + Math.random() * 60}%`,
                  filter: 'blur(2px)',
                  boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                  transformOrigin: 'center',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1], 
                  opacity: [0, 0.8, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, Math.random() * 360]
                }}
                transition={{ 
                  duration: 1.5 + Math.random() * 1,
                  ease: "easeOut",
                  delay: index * 0.08
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 pt-24 pb-20 text-center relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider text-white leading-tight"
          >
            BELIEVE <br /> 
            <motion.span 
              className="text-perfume-pink"
              animate={imageLoaded ? { 
                textShadow: ["0px 0px 0px rgba(255,157,176,0)", "0px 0px 20px rgba(255,157,176,0.7)", "0px 0px 0px rgba(255,157,176,0)"]
              } : {}}
              transition={{ 
                repeat: Infinity,
                duration: 3, 
                ease: "easeInOut",
                delay: 1.2
              }}
            >
              IN DREAMS
            </motion.span>
          </motion.h1>
          
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
              onMouseEnter={handleButtonHover}
            >
              <Link to="/products">
                <span className="relative z-10 flex items-center">
                  <span>Discover Collection</span>
                  <Droplets className="ml-2 w-4 h-4 opacity-70" />
                </span>
                <span className="absolute inset-0 bg-perfume-pink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 transition-all duration-300"
              onMouseEnter={handleButtonHover}
            >
              <Link to="/about">
                <span className="flex items-center">
                  Our Story
                  <motion.span 
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="ml-2"
                  >
                    <Droplets className="w-4 h-4 opacity-70" />
                  </motion.span>
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
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
          whileHover={{ scale: 1.2 }}
          onHoverStart={handleButtonHover}
        >
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
