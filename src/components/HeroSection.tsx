
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-perfume-darkBrown to-black"></div>
      
      {/* Animated glow effects */}
      <motion.div 
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
        className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-perfume-pink/10 rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute left-0 top-1/4 w-1/2 h-1/2 bg-perfume-green/10 rounded-full blur-3xl"
      ></motion.div>
      
      <div className="container mx-auto px-4 pt-24 pb-20 flex flex-col lg:flex-row items-center relative z-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white leading-tight"
          >
            EMBRACE YOUR <br /> 
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
              DREAM SCENT
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            <motion.img 
              src="/lovable-uploads/5778a9ee-c12b-4abf-95a1-60a4759e0426.png" 
              alt="Luxury Perfume" 
              className="mx-auto h-auto max-h-[70vh] object-contain relative z-10"
              whileHover={{ 
                y: -10,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
              animate={{ 
                y: [0, -10, 0], 
                rotate: [0, 1, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0], 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 right-1/4 bottom-1/2 bg-perfume-pink/20 rounded-full blur-3xl -z-10"
            />
          </motion.div>
          
          {/* Small floating bottles for decoration */}
          <motion.img 
            src="/lovable-uploads/61c4de73-1a6f-4d20-94af-949fcba84ca2.png" 
            alt="Perfume Bottle" 
            className="absolute top-1/4 left-0 w-24 md:w-32 opacity-40 z-0"
            animate={{ 
              y: [0, -15, 0], 
              rotate: [0, -5, 0],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          <motion.img 
            src="/lovable-uploads/78a4ff0b-a9a2-45da-abd2-494740d50032.png" 
            alt="Perfume Bottle" 
            className="absolute bottom-1/4 right-0 w-20 md:w-28 opacity-40 z-0"
            animate={{ 
              y: [0, -20, 0], 
              rotate: [0, 8, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
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
