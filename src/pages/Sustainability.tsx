
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const Sustainability: React.FC = () => {
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
                <BreadcrumbLink href="/sustainability">Sustainability</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center">Our Commitment to Sustainability</h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-300 mb-12 text-center"
            >
              At PHEROMA, sustainability isn't just a trend—it's a core value that guides every decision we make.
            </motion.p>
            
            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-serif mb-4 tracking-wider">Responsible Sourcing</h2>
                  <p className="text-gray-300 mb-4">
                    We carefully select suppliers who share our commitment to ethical practices. From lavender fields in Kashmir to rose farms in Tamil Nadu, we work directly with growers who prioritize sustainable cultivation methods.
                  </p>
                  <p className="text-gray-300">
                    Our ingredients are harvested at their peak, ensuring the highest quality while respecting natural growth cycles and minimizing environmental impact.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/61c4de73-1a6f-4d20-94af-949fcba84ca2.png" 
                    alt="Sustainable Sourcing" 
                    className="rounded-lg shadow-xl w-full"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row-reverse items-center gap-12"
              >
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-serif mb-4 tracking-wider">Eco-Friendly Packaging</h2>
                  <p className="text-gray-300 mb-4">
                    Our bottles are designed to be both beautiful and environmentally conscious. We use recycled glass for all our perfume bottles, and our packaging is made from FSC-certified materials and vegetable-based inks.
                  </p>
                  <p className="text-gray-300">
                    We've eliminated plastic from our packaging process and continue to innovate with biodegradable alternatives for product protection during shipping.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/78a4ff0b-a9a2-45da-abd2-494740d50032.png" 
                    alt="Eco-Friendly Packaging" 
                    className="rounded-lg shadow-xl w-full"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-serif mb-4 tracking-wider">Community Support</h2>
                  <p className="text-gray-300 mb-4">
                    We believe in giving back to the communities that make our fragrances possible. A percentage of every sale is reinvested in educational programs for the next generation of Indian perfumers and sustainable farming practices in regions where our ingredients are grown.
                  </p>
                  <p className="text-gray-300">
                    Through our apprenticeship program, we provide training and employment opportunities in artisanal perfumery, helping to preserve traditional skills while creating sustainable livelihoods.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/2191ab81-b1c5-4781-aab4-99ffaf38ecd1.png" 
                    alt="Community Support" 
                    className="rounded-lg shadow-xl w-full"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-center"
              >
                <h2 className="text-2xl font-serif mb-6 tracking-wider">Our Ongoing Commitment</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Sustainability is a journey, not a destination. We continually evaluate our practices and set ambitious goals for reducing our environmental footprint. By 2026, we aim to achieve carbon neutrality across our entire supply chain and transition to 100% renewable energy in our production facilities.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sustainability;
