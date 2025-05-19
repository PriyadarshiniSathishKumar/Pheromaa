
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-perfume-darkBrown to-black"></div>
      
      {/* Animated glow effect */}
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
      
      <div className="container mx-auto px-4 pt-24 pb-20 flex flex-col lg:flex-row items-center relative z-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white leading-tight"
          >
            EMBRACE YOUR <br /> 
            <span className="text-perfume-pink">DREAM SCENT</span>
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
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
              <Link to="/products">
                Discover Collection
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
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
            transition={{ 
              duration: 1,
              delay: 0.6
            }}
            className="relative"
          >
            <img 
              src="/lovable-uploads/bc44527a-0e02-40d7-8e56-084f3d9e00f4.png" 
              alt="Luxury Perfume" 
              className="mx-auto h-auto max-h-[70vh] object-contain relative z-10 pink-glow"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
