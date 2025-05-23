
import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets } from 'lucide-react';

const CraftingPerfectionSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-purple-900/20 via-perfume-darkBrown to-black relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"
            style={{
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/lovable-uploads/a58dc36d-d1ea-4589-870a-d1aec7d7971d.png" 
                alt="Crafting Perfection" 
                className="rounded-xl shadow-2xl w-full"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ scale }}
          >
            <motion.h2 
              className="text-4xl lg:text-6xl font-serif mb-6 tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.span
                className="block"
                animate={{
                  backgroundImage: [
                    "linear-gradient(45deg, #ffffff, #c59dff)",
                    "linear-gradient(45deg, #c59dff, #ff57a8)",
                    "linear-gradient(45deg, #ff57a8, #ffffff)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >
                CRAFTING
              </motion.span>
              <motion.span
                className="block text-perfume-pink"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255, 87, 168, 0)",
                    "0 0 20px rgba(255, 87, 168, 0.8)",
                    "0 0 0px rgba(255, 87, 168, 0)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                PERFECTION
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Each PHEROMA fragrance is meticulously crafted by master perfumers 
              using only the finest ingredients. Our dedication to quality ensures an 
              unparalleled olfactory experience that evolves beautifully throughout 
              the day.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-perfume-pink to-purple-500 hover:from-purple-500 hover:to-perfume-pink text-white border-0 group"
              >
                <Link to="/about" className="flex items-center">
                  <motion.span
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Learn about our process
                    <motion.div
                      animate={{ 
                        x: [0, 5, 0],
                        rotate: [0, 15, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        ease: "easeInOut" 
                      }}
                    >
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.div>
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating perfume droplets */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 4 + 3,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          >
            <Droplets 
              size={12} 
              className="text-perfume-pink opacity-40" 
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CraftingPerfectionSection;
