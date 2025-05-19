
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/about">About</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center">Our Story</h1>
            
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:w-1/2"
              >
                <img 
                  src="/lovable-uploads/61c4de73-1a6f-4d20-94af-949fcba84ca2.png" 
                  alt="Luxury Perfume" 
                  className="rounded-lg shadow-xl w-full"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="md:w-1/2"
              >
                <h2 className="text-2xl font-serif mb-4 tracking-wider">The Birth of PHEROMA</h2>
                <p className="text-gray-300 mb-4">
                  Founded in 2020, PHEROMA was born from a passion for artisanal perfumery and a desire to create fragrances that tell a story. Our founder, inspired by childhood memories of traditional Indian attars and the global heritage of perfume-making, embarked on a journey to create a new kind of luxury fragrance house.
                </p>
                <p className="text-gray-300">
                  Today, PHEROMA stands at the intersection of tradition and innovation, drawing from India's rich olfactory heritage while embracing modern perfumery techniques to create scents that are both timeless and contemporary.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-serif mb-4 tracking-wider text-center">Our Philosophy</h2>
              <p className="text-gray-300 mb-6 text-center max-w-3xl mx-auto">
                At PHEROMA, we believe that fragrance is an expression of individuality and a catalyst for memory. Each scent is carefully crafted to evoke emotions, capture moments, and enhance experiences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-perfume-darkBrown p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-3">Artisanal Craftsmanship</h3>
                  <p className="text-gray-300">
                    Every PHEROMA fragrance is meticulously blended in small batches, ensuring the highest quality and attention to detail.
                  </p>
                </div>
                <div className="bg-perfume-darkBrown p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-3">Sustainable Luxury</h3>
                  <p className="text-gray-300">
                    We source our ingredients ethically and responsibly, with a commitment to minimizing our environmental footprint.
                  </p>
                </div>
                <div className="bg-perfume-darkBrown p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-3">Timeless Innovation</h3>
                  <p className="text-gray-300">
                    Our perfumers blend traditional techniques with innovative approaches to create scents that transcend trends.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-2xl font-serif mb-4 tracking-wider text-center">Our Commitment</h2>
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <p className="text-gray-300 mb-4">
                    We are dedicated to creating fragrances that celebrate India's rich olfactory heritage while appealing to global sensibilities. From the spice markets of Delhi to the jasmine fields of Tamil Nadu, our scents are a tribute to the diverse aromatic landscape of India.
                  </p>
                  <p className="text-gray-300">
                    As we grow, we remain committed to our founding principles: quality over quantity, artistry over mass production, and creating fragrances that tell a story uniquely yours.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/34d937cd-3f7a-4fd4-8d66-31875f61c372.png" 
                    alt="Perfume Craftsmanship" 
                    className="rounded-lg shadow-xl w-full"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
