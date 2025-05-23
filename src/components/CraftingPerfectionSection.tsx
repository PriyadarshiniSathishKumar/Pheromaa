
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
  
  // Enhanced smooth scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 1.05]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 5]);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-purple-900/20 via-perfume-darkBrown to-black relative overflow-hidden"
      style={{ opacity }}
    >
      {/* WebGL-style animated background with fluid distortions */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 400 + 200 + 'px',
              height: Math.random() * 400 + 200 + 'px',
              left: Math.random() * 120 - 10 + '%',
              top: Math.random() * 120 - 10 + '%',
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(255, 87, 168, 0.15)' :
                i % 3 === 1 ? 'rgba(197, 157, 255, 0.12)' :
                'rgba(147, 51, 234, 0.1)'
              }, transparent 70%)`,
              filter: `blur(${Math.random() * 60 + 40}px)`,
            }}
            animate={{
              scale: [1, 1.3, 0.8, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.1, 0.4, 0.2, 0.5, 0.1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 15 + 15,
              ease: "easeInOut",
              delay: Math.random() * 8
            }}
          />
        ))}
      </div>

      {/* Volumetric scroll effects with layered depth */}
      <div className="absolute inset-0 z-[1]">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              transform: `translateZ(${i * 50}px)`,
            }}
            animate={{
              y: [0, -30 - i * 5, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 360],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 8 + 8,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            <div 
              className="w-8 h-8 rounded-full bg-gradient-to-r from-perfume-pink to-purple-500"
              style={{ filter: `blur(${i * 2}px)` }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ y, rotate }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ 
                filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
              }}
            >
              {/* Advanced image with WebGL-style effects */}
              <motion.div className="relative overflow-hidden rounded-xl">
                <motion.img 
                  src="/lovable-uploads/9ca546a6-552c-41f9-8657-3f3dba457708.png" 
                  alt="Crafting Perfection" 
                  className="rounded-xl shadow-2xl w-full transform-gpu"
                  animate={{
                    filter: [
                      "hue-rotate(0deg) saturate(1)",
                      "hue-rotate(10deg) saturate(1.1)",
                      "hue-rotate(0deg) saturate(1)"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Lens distortion overlay */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 87, 168, 0.2) 0%, transparent 60%)',
                    mixBlendMode: 'overlay'
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glitch effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: [0, 1, 0, 1, 0],
                    scaleX: [1, 1.02, 1, 0.98, 1],
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] },
                    scaleX: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }
                  }}
                />
              </motion.div>
              
              {/* Morphing particles around image */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-perfume-pink/30"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${10 + Math.sin(i) * 30}%`,
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 0.8, 0.3],
                    rotate: [0, 180, 360],
                    x: [0, Math.sin(i * 2) * 20, 0],
                    y: [0, Math.cos(i * 2) * 20, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 + i * 0.5,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ scale }}
          >
            {/* Enhanced typography with advanced effects */}
            <motion.h2 
              className="text-4xl lg:text-6xl font-serif mb-6 tracking-wider relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span
                className="block relative overflow-hidden"
                animate={{
                  backgroundImage: [
                    "linear-gradient(45deg, #ffffff, #c59dff)",
                    "linear-gradient(135deg, #c59dff, #ff57a8)",
                    "linear-gradient(225deg, #ff57a8, #ffffff)",
                    "linear-gradient(315deg, #ffffff, #c59dff)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255, 87, 168, 0.3))"
                }}
              >
                CRAFTING
                
                {/* Flowing text underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-perfume-pink via-purple-500 to-perfume-pink"
                  animate={{
                    width: ["0%", "100%", "0%"],
                    x: ["0%", "0%", "100%"]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
              
              <motion.span
                className="block text-perfume-pink relative"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255, 87, 168, 0)",
                    "0 0 30px rgba(255, 87, 168, 0.8)",
                    "0 0 60px rgba(255, 87, 168, 0.6)",
                    "0 0 30px rgba(255, 87, 168, 0.8)",
                    "0 0 0px rgba(255, 87, 168, 0)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                PERFECTION
                
                {/* Morphing background */}
                <motion.div
                  className="absolute inset-0 -z-10 opacity-20"
                  animate={{
                    borderRadius: [
                      "20% 80% 80% 20%",
                      "80% 20% 20% 80%",
                      "20% 80% 80% 20%"
                    ],
                    background: [
                      "radial-gradient(ellipse, #ff57a8, transparent)",
                      "radial-gradient(ellipse, #c59dff, transparent)",
                      "radial-gradient(ellipse, #ff57a8, transparent)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />
              </motion.span>
            </motion.h2>
            
            {/* Enhanced description with fluid animations */}
            <motion.p 
              className="text-gray-300 text-lg mb-8 leading-relaxed relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Character-by-character reveal animation */}
              {`Each PHEROMA fragrance is meticulously crafted by master perfumers using only the finest ingredients. Our dedication to quality ensures an unparalleled olfactory experience that evolves beautifully throughout the day.`.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.03, delay: 0.8 + i * 0.01 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
            
            {/* Enhanced button with morphing effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-perfume-pink to-purple-500 hover:from-purple-500 hover:to-perfume-pink text-white border-0 group relative overflow-hidden"
              >
                <Link to="/about" className="flex items-center">
                  {/* Flowing background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "200%"]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      repeatDelay: 3
                    }}
                  />
                  
                  <motion.span
                    className="flex items-center relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Learn about our process
                    <motion.div
                      animate={{ 
                        x: [0, 8, 0],
                        rotate: [0, 20, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.5, 
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
      
      {/* Enhanced floating perfume droplets with physics */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30 - Math.random() * 20, 0],
              x: [0, Math.sin(i * 0.5) * 15, 0],
              scale: [0.8, 1.4, 0.8],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 6 + 4,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          >
            <Droplets 
              size={8 + Math.random() * 8} 
              className="text-perfume-pink"
              style={{
                filter: `drop-shadow(0 0 ${5 + Math.random() * 10}px rgba(255, 87, 168, 0.6))`
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Generative particle system */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -window.innerHeight],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 8 + 5,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default CraftingPerfectionSection;
