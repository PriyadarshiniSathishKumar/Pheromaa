
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
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif tracking-wider">Featured Collection</h2>
              <Link 
                to="/products" 
                className="flex items-center text-perfume-pink hover:text-white transition-colors"
              >
                View All <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <PerfumeCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Craftsmanship Section */}
        <section className="py-20 bg-perfume-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-4xl font-serif mb-6 tracking-wider">CRAFTING DREAMS</h2>
                <p className="text-gray-300 mb-6">
                  At PHEROMA, we believe that fragrance is an art that speaks directly to the soul. Our perfumes embody precision, combining rare ingredients and unique accords to create scents that resonate with emotion, moment, and mood.
                </p>
                <p className="text-gray-300 mb-8">
                  Each bottle is meticulously crafted with attention to detail, creating timeless elegance that complements the exquisite fragrance within. Our perfumers blend tradition with innovation to deliver an olfactory experience that captures the essence of luxury.
                </p>
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-perfume-pink hover:text-white transition-colors"
                >
                  Learn more about our craft <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <img 
                  src="/lovable-uploads/6dd1ea80-cd87-4b73-92bc-f48dfc3d8552.png" 
                  alt="Perfume Craftsmanship" 
                  className="rounded-lg shadow-xl w-full green-glow"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Rarity Section */}
        <section className="py-20 bg-gradient-to-t from-perfume-darkBrown/50 to-perfume-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-4xl font-serif mb-6 tracking-wider">RARITY</h2>
                <p className="text-gray-300 mb-6">
                  PHEROMA fragrances are crafted in limited batches for those seeking something truly extraordinary. Each bottle is numbered, making it as unique and unforgettable as the moments it inspires.
                </p>
                <p className="text-gray-300 mb-8">
                  We source the finest ingredients from across the globe, ensuring that each scent tells a story of exceptional quality and exclusivity. Our limited edition collections showcase the pinnacle of perfumery art, created for the most discerning fragrance connoisseurs.
                </p>
                <Link 
                  to="/collections/exclusive" 
                  className="inline-flex items-center text-perfume-pink hover:text-white transition-colors"
                >
                  Discover limited editions <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <img 
                  src="/lovable-uploads/4e27c576-de31-409f-bb64-32159c8ba565.png" 
                  alt="Limited Edition Perfume" 
                  className="rounded-lg shadow-xl w-full pink-glow"
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
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 bg-black/30 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-perfume-pink w-full sm:w-96"
                />
                <button className="px-6 py-3 bg-perfume-pink text-black font-semibold rounded-md hover:bg-opacity-90 transition-colors">
                  Subscribe
                </button>
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
