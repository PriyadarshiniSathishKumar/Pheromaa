
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ParallaxSectionProps {
  reverseDirection?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ reverseDirection = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reverseDirection ? -10 : 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={ref} className="py-24 bg-perfume-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 87, 168, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(50px)'
          }}
        />
        
        {/* Background particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 87, 168, ' + (Math.random() * 0.4 + 0.1) + ')',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(1px)'
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, Math.random() * 0.5 + 0.2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col ${reverseDirection ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
          <motion.div 
            style={{ 
              y: reverseDirection ? y2 : y1,
              scale,
              opacity
            }}
            className="w-full md:w-1/2"
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {reverseDirection ? "CRAFTING PERFECTION" : "EXPERIENCE THE ESSENCE"}
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {reverseDirection 
                ? "Each PHEROMA fragrance is meticulously crafted by master perfumers using only the finest ingredients. Our dedication to quality ensures an unparalleled olfactory experience that evolves beautifully throughout the day."
                : "Discover fragrances that tell a story, evoke emotions, and create lasting impressions. Our collection represents the pinnacle of perfumery art, with each scent carefully composed to transport you to a world of sensory delight."}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ x: 5 }}
            >
              <Link 
                to={reverseDirection ? "/about" : "/products"} 
                className="inline-flex items-center text-perfume-pink hover:text-white transition-colors group"
              >
                {reverseDirection ? "Learn about our process" : "Explore the collection"} 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="group-hover:translate-x-2 transition-transform"
                >
                  <ArrowRight size={16} className="ml-2" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            style={{ 
              y: reverseDirection ? y1 : y2,
              rotate,
              scale,
              opacity
            }}
            className="w-full md:w-1/2 liquid-blob"
          >
            <motion.img 
              src={reverseDirection 
                ? "/lovable-uploads/34d937cd-3f7a-4fd4-8d66-31875f61c372.png"
                : "/lovable-uploads/cbdd91a3-4560-4d99-b5e2-6f90b665802f.png"
              } 
              alt={reverseDirection ? "Perfume Craftsmanship" : "Luxury Perfume"} 
              className="rounded-lg shadow-xl w-full morph-animation"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(255, 87, 168, 0.25)"
              }}
            />
            
            {/* Floating elements */}
            {reverseDirection ? (
              <motion.div
                className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 filter blur-md"
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity, 
                  duration: 8,
                  ease: "easeInOut"
                }}
              />
            ) : (
              <motion.div
                className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-r from-pink-500/30 to-orange-500/30 filter blur-md"
                animate={{
                  y: [5, -5, 5],
                  x: [5, -5, 5],
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
