
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import PerfumeCard from '@/components/PerfumeCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, categories, genders } from '@/data/products';

const Collections: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const collections = [
    {
      id: "men",
      name: "Men's Collection",
      description: "Bold, sophisticated fragrances designed for the modern gentleman. Featuring woody, spicy, and aromatic notes that exude confidence and masculinity.",
      image: "/lovable-uploads/34d937cd-3f7a-4fd4-8d66-31875f61c372.png",
    },
    {
      id: "women",
      name: "Women's Collection",
      description: "Elegant, captivating scents that celebrate femininity. From floral bouquets to oriental blends, discover fragrances that leave a lasting impression.",
      image: "/lovable-uploads/5778a9ee-c12b-4abf-95a1-60a4759e0426.png",
    },
    {
      id: "unisex",
      name: "Unisex Fragrances",
      description: "Boundary-breaking scents that transcend traditional gender categories. Contemporary, versatile fragrances for the modern individual.",
      image: "/lovable-uploads/61c4de73-1a6f-4d20-94af-949fcba84ca2.png",
    },
    {
      id: "luxury",
      name: "Luxury Edition",
      description: "Our most exclusive and opulent creations. Limited edition fragrances featuring rare ingredients and exquisite craftsmanship for the true connoisseur.",
      image: "/lovable-uploads/78a4ff0b-a9a2-45da-abd2-494740d50032.png",
    },
  ];
  
  const filteredProducts = products.filter(product => 
    activeTab === "all" || product.gender === activeTab || product.category === activeTab
  );
  
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
                <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center">Our Collections</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {collections.map((collection, index) => (
                <motion.div 
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <Link to={`/collections/${collection.id}`} className="block">
                    <div className="relative h-96">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                        <h3 className="text-2xl font-serif mb-2 tracking-wider">{collection.name}</h3>
                        <p className="text-gray-300">{collection.description}</p>
                        <span className="mt-4 inline-flex items-center text-perfume-pink">
                          Explore Collection
                          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-serif mb-12 tracking-wider text-center">Browse Our Fragrances</h2>
              
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-perfume-darkBrown">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="men">Men</TabsTrigger>
                    <TabsTrigger value="women">Women</TabsTrigger>
                    <TabsTrigger value="unisex">Unisex</TabsTrigger>
                    <TabsTrigger value="luxury">Luxury</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value={activeTab} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <PerfumeCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
