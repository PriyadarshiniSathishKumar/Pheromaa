
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PerfumeCard from '@/components/PerfumeCard';
import { products } from '@/data/products';

const Index: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main>
        <HeroSection />
        
        {/* Featured Products Section */}
        <section className="py-20 bg-gradient-to-b from-perfume-darkBrown to-perfume-black">
          <div className="container mx-auto px-4 text-center">
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
                className="inline-flex items-center text-perfume-pink hover:text-white transition-colors"
              >
                View All 
                <motion.span
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
                >
                  <PerfumeCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Craftsmanship Section */}
        <section className="py-20 bg-perfume-black">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl"
              >
                <h2 className="text-4xl font-serif mb-6 tracking-wider">CRAFTING DREAMS</h2>
                <p className="text-gray-300 mb-6">
                  At PHEROMA, we believe that fragrance is an art that speaks directly to the soul. Our perfumes embody precision, combining rare ingredients and unique accords to create scents that resonate with emotion, moment, and mood.
                </p>
                <p className="text-gray-300 mb-8">
                  Each bottle is meticulously crafted with attention to detail, creating timeless elegance that complements the exquisite fragrance within. Our perfumers blend tradition with innovation to deliver an olfactory experience that captures the essence of luxury.
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/about" 
                    className="inline-flex items-center text-perfume-pink hover:text-white transition-colors"
                  >
                    Learn more about our craft 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight size={16} className="ml-2" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl"
              >
                <motion.img 
                  src="/lovable-uploads/34d937cd-3f7a-4fd4-8d66-31875f61c372.png" 
                  alt="Perfume Craftsmanship" 
                  className="rounded-lg shadow-xl w-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Rarity Section */}
        <section className="py-20 bg-gradient-to-t from-perfume-darkBrown/50 to-perfume-black">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl"
              >
                <h2 className="text-4xl font-serif mb-6 tracking-wider">RARITY</h2>
                <p className="text-gray-300 mb-6">
                  PHEROMA fragrances are crafted in limited batches for those seeking something truly extraordinary. Each bottle is numbered, making it as unique and unforgettable as the moments it inspires.
                </p>
                <p className="text-gray-300 mb-8">
                  We source the finest ingredients from across the globe, ensuring that each scent tells a story of exceptional quality and exclusivity. Our limited edition collections showcase the pinnacle of perfumery art, created for the most discerning fragrance connoisseurs.
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to="/collections/exclusive" 
                    className="inline-flex items-center text-perfume-pink hover:text-white transition-colors"
                  >
                    Discover limited editions 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight size={16} className="ml-2" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-3xl"
              >
                <motion.img 
                  src="/lovable-uploads/cbdd91a3-4560-4d99-b5e2-6f90b665802f.png" 
                  alt="Limited Edition Perfume" 
                  className="rounded-lg shadow-xl w-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-20 bg-perfume-darkBrown">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-serif mb-4 tracking-wider">Stay Connected</h2>
              <p className="text-gray-300 mb-8">
                Subscribe to receive exclusive offers, early access to limited editions, and fragrance insights from our perfumers.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.div className="w-full sm:w-96" whileHover={{ scale: 1.02 }}>
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
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
