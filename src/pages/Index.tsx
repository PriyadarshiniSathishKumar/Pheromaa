import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PerfumeCard from '@/components/PerfumeCard';
import ParallaxSection from '@/components/ParallaxSection';
import CraftingPerfectionSection from '@/components/CraftingPerfectionSection';
import EnhancedShopSection from '@/components/EnhancedShopSection';
import { products } from '@/data/products';

const Index: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main>
        <HeroSection />
        
        {/* Enhanced Shop Section */}
        <EnhancedShopSection />
        
        {/* Crafting Perfection Section */}
        <CraftingPerfectionSection />
        
        {/* Featured Products Section with enhanced animations */}
        <motion.section 
          className="py-20 bg-gradient-to-b from-perfume-darkBrown to-perfume-black relative overflow-hidden"
          ref={containerRef}
        >
          <motion.div 
            className="absolute inset-0 z-0 opacity-10"
            style={{ 
              backgroundImage: `url(/lovable-uploads/45d25ded-2f0f-4e7f-bbf4-804fe0d8de69.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: backgroundY
            }}
          />
          
          {/* Animated particles background */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-perfume-pink/20"
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  y: [0, -100],
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
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-serif tracking-wider mb-6"
            >
              <span className="relative">
                <motion.span
                  animate={{
                    textShadow: ["0px 0px 0px rgba(255, 87, 168, 0)", "0px 0px 15px rgba(255, 87, 168, 0.8)", "0px 0px 0px rgba(255, 87, 168, 0)"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  Featured Collection
                </motion.span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-perfume-pink"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link 
                to="/products" 
                className="inline-flex items-center text-perfume-pink hover:text-white transition-colors group"
              >
                View All 
                <motion.span
                  className="group-hover:translate-x-2 transition-transform"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={16} className="ml-2" />
                </motion.span>
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10, 
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="card-3d"
                >
                  <PerfumeCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Parallax Sections */}
        <ParallaxSection />
        <ParallaxSection reverseDirection={true} />
        
        {/* Enhanced Newsletter Section */}
        <section className="py-20 bg-perfume-darkBrown relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800/20 via-perfume-darkBrown to-black"></div>
            
            {/* Animated blobs */}
            <motion.div 
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 filter blur-[50px]"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, 20, 0],
                rotate: [0, 90, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 20, 
                ease: "easeInOut" 
              }}
            />
            
            <motion.div 
              className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 filter blur-[60px]"
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, -30, 0],
                rotate: [0, -90, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 25, 
                ease: "easeInOut" 
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto glass-effect rounded-xl p-8 backdrop-blur-md"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl font-serif mb-4 tracking-wider"
              >
                Stay Connected
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300 mb-8"
              >
                Subscribe to receive exclusive offers, early access to limited editions, and fragrance insights from our perfumers.
              </motion.p>
              
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <motion.div 
                  className="w-full sm:w-96" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 bg-black/30 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-perfume-pink w-full"
                  />
                </motion.div>
                <motion.button 
                  className="px-6 py-3 bg-perfume-pink text-black font-semibold rounded-md hover:bg-opacity-90 transition-colors"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 87, 168, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: Math.random() * 4 + 2 + 'px',
                      height: Math.random() * 4 + 2 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [0, -(Math.random() * 20 + 10)],
                      opacity: [0, 0.7, 0],
                      scale: [1, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: Math.random() * 2 + 2,
                      ease: "easeOut",
                      delay: Math.random() * 5
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
