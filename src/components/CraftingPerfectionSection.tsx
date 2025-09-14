
import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets } from 'lucide-react';
import LazyImage from './LazyImage';

// Optimized background component with reduced elements
const OptimizedBackground = React.memo(() => {
  // Reduced from 30 to 8 elements for performance
  const backgroundElements = React.useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 300 + 150,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: i % 3 === 0 ? 'rgba(255, 87, 168, 0.1)' :
             i % 3 === 1 ? 'rgba(197, 157, 255, 0.08)' :
             'rgba(147, 51, 234, 0.06)',
      blur: Math.random() * 40 + 30,
      duration: Math.random() * 10 + 10
    })), []
  );

  return (
    <div className="absolute inset-0">
      {backgroundElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          style={{
            width: element.size + 'px',
            height: element.size + 'px',
            left: element.left + '%',
            top: element.top + '%',
            background: `radial-gradient(circle, ${element.color}, transparent 70%)`,
            filter: `blur(${element.blur}px)`,
            willChange: 'transform, opacity'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: element.duration,
            ease: "easeInOut",
            delay: element.id * 0.5
          }}
        />
      ))}
    </div>
  );
});

// Optimized floating elements
const FloatingElements = React.memo(() => {
  // Reduced from 25 to 6 elements
  const elements = React.useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 8 + Math.random() * 6,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: element.left + '%',
            top: element.top + '%',
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(element.id * 0.5) * 10, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: element.duration,
            ease: "easeInOut",
            delay: element.delay
          }}
        >
          <Droplets 
            size={element.size} 
            className="text-perfume-pink"
            style={{
              filter: `drop-shadow(0 0 8px rgba(255, 87, 168, 0.4))`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
});

const CraftingPerfectionSection: React.FC = React.memo(() => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Optimized scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 1.02]);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-purple-900/20 via-perfume-darkBrown to-black relative overflow-hidden"
      style={{ opacity, willChange: 'transform, opacity' }}
    >
      {/* Optimized background */}
      <OptimizedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ y }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Optimized image with lazy loading */}
              <LazyImage
                src="/lovable-uploads/9ca546a6-552c-41f9-8657-3f3dba457708.png"
                alt="Crafting Perfection"
                className="rounded-xl shadow-2xl w-full"
                loading="lazy"
              />
              
              {/* Simplified hover effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 87, 168, 0.3) 0%, transparent 60%)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{ scale }}
          >
            {/* Optimized typography */}
            <motion.h2 
              className="text-4xl lg:text-6xl font-serif mb-6 tracking-wider relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="block relative overflow-hidden bg-gradient-to-r from-white via-perfume-pink to-white bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              >
                CRAFTING
              </motion.span>
              
              <motion.span
                className="block text-perfume-pink relative"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(255, 87, 168, 0.3)",
                    "0 0 20px rgba(255, 87, 168, 0.6)",
                    "0 0 10px rgba(255, 87, 168, 0.3)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                PERFECTION
              </motion.span>
            </motion.h2>
            
            {/* Optimized description - removed character animation for performance */}
            <motion.p 
              className="text-gray-300 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Each PHEROMA fragrance is meticulously crafted by master perfumers using only the finest ingredients. Our dedication to quality ensures an unparalleled olfactory experience that evolves beautifully throughout the day.
            </motion.p>
            
            {/* Optimized button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-perfume-pink to-purple-500 hover:from-purple-500 hover:to-perfume-pink text-white border-0 group relative overflow-hidden"
              >
                <Link to="/about" className="flex items-center">
                  <motion.span
                    className="flex items-center relative z-10"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    Learn about our process
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Optimized floating elements */}
      <FloatingElements />
    </motion.section>
  );
});

export default CraftingPerfectionSection;
