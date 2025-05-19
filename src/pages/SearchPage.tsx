
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import PerfumeCard from '@/components/PerfumeCard';
import { products } from '@/data/products';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(products);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredProducts);
    } else {
      setResults(products);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults(products);
  };

  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center">Search Our Collection</h1>
            
            <form onSubmit={handleSearch} className="relative mb-8">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, notes, or category..."
                className="bg-perfume-darkBrown border-perfume-darkBrown focus:ring-perfume-pink pl-12 pr-12 py-6 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              )}
              
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4"
              >
                Search
              </Button>
            </form>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-gray-400">Popular searches:</span>
              <button 
                onClick={() => {setSearchQuery('Rose'); handleSearch({ preventDefault: () => {} } as React.FormEvent);}} 
                className="text-perfume-pink hover:text-white transition-colors"
              >
                Rose
              </button>
              <button 
                onClick={() => {setSearchQuery('Woody'); handleSearch({ preventDefault: () => {} } as React.FormEvent);}}
                className="text-perfume-pink hover:text-white transition-colors"
              >
                Woody
              </button>
              <button 
                onClick={() => {setSearchQuery('Citrus'); handleSearch({ preventDefault: () => {} } as React.FormEvent);}}
                className="text-perfume-pink hover:text-white transition-colors"
              >
                Citrus
              </button>
              <button 
                onClick={() => {setSearchQuery('Luxury'); handleSearch({ preventDefault: () => {} } as React.FormEvent);}}
                className="text-perfume-pink hover:text-white transition-colors"
              >
                Luxury
              </button>
              <button 
                onClick={() => {setSearchQuery('Unisex'); handleSearch({ preventDefault: () => {} } as React.FormEvent);}}
                className="text-perfume-pink hover:text-white transition-colors"
              >
                Unisex
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-serif tracking-wider">
                {searchQuery ? `Results for "${searchQuery}"` : "All Fragrances"}
              </h2>
              <p className="text-gray-400">{results.length} items</p>
            </div>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((product, index) => (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl mb-4">No results found for "{searchQuery}"</p>
                <p className="text-gray-400 mb-8">Try adjusting your search or browse our categories</p>
                <Button onClick={clearSearch}>View All Fragrances</Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
