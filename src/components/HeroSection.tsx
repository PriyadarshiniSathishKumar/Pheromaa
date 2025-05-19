
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    });
  }, [controls]);
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full landscape image background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="/lovable-uploads/355ad372-8625-4814-8d3a-b8d755e8d4dc.png"
          alt="Luxury Perfume"
          className="w-full h-full object-cover"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 2 }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-perfume-darkBrown/70 to-black/80"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-20 flex flex-col lg:flex-row items-center relative z-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider text-white leading-tight"
          >
            BELIEVE <br /> 
            <motion.span 
              className="text-perfume-pink"
              animate={{ 
                textShadow: ["0px 0px 0px rgba(255,157,176,0)", "0px 0px 20px rgba(255,157,176,0.7)", "0px 0px 0px rgba(255,157,176,0)"]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3, 
                ease: "easeInOut" 
              }}
            >
              IN DREAMS
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-gray-300 max-w-lg mx-auto lg:mx-0"
          >
            Step into a world of captivating aromas with PHEROMA, where each fragrance is crafted to evoke emotion, inspire memories, and define your essence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 space-x-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 relative overflow-hidden group"
            >
              <Link to="/products">
                <span className="relative z-10">Discover Collection</span>
                <span className="absolute inset-0 bg-perfume-pink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              <Link to="/about">
                Our Story
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <div className="w-full lg:w-1/2 relative">
          {/* Removed perfume bottle image to let the background be the main focus */}
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          whileHover={{ scale: 1.2 }}
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
