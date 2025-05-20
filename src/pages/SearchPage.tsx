
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react';
import PerfumeCard from '@/components/PerfumeCard';
import { products } from '@/data/products';
import { useSearchParams } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState(products);
  const [sortBy, setSortBy] = useState('relevance'); // Options: relevance, price-low, price-high, name-asc, name-desc
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000], // Min and max price
    gender: '', // 'male', 'female', 'unisex'
    availability: false, // In stock only
  });
  const [showFilters, setShowFilters] = useState(false);

  // Initial search based on URL parameters
  useEffect(() => {
    if (initialQuery) {
      handleSearch(null, initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent | null, queryOverride?: string) => {
    if (e) e.preventDefault();
    
    const query = queryOverride !== undefined ? queryOverride : searchQuery;
    
    if (query !== initialQuery) {
      // Update URL without reloading
      setSearchParams(query ? { q: query } : {});
    }
    
    // Apply search and filters
    let filteredProducts = products;
    
    // Apply text search
    if (query.trim()) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply price range filter
    filteredProducts = filteredProducts.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply gender filter
    if (filters.gender) {
      filteredProducts = filteredProducts.filter(product => 
        product.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    
    // Apply availability filter
    if (filters.availability) {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
        break;
      // For relevance we don't sort (default order)
      default:
        break;
    }
    
    setResults(filteredProducts);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    setFilters({
      category: '',
      priceRange: [0, 1000],
      gender: '',
      availability: false,
    });
    setSortBy('relevance');
    setResults(products);
  };
  
  // Extract unique categories from products
  const categories = [...new Set(products.map(product => product.category))];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-perfume-black text-white page-transition-in">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif mb-8 tracking-wider text-center"
            >
              Search Our Collection
            </motion.h1>
            
            <form onSubmit={(e) => handleSearch(e)} className="relative mb-8">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                className="relative"
              >
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, notes, or category..."
                  className="bg-perfume-darkBrown border-perfume-darkBrown focus:ring-perfume-pink pl-12 pr-12 py-6 text-lg search-expand"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                
                {searchQuery && (
                  <motion.button 
                    type="button" 
                    onClick={clearSearch}
                    className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                )}
                
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    type="submit" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4"
                  >
                    Search
                  </Button>
                </motion.div>
              </motion.div>
            </form>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              <span className="text-gray-400">Popular searches:</span>
              {["Rose", "Woody", "Citrus", "Luxury", "Unisex"].map((term, index) => (
                <motion.button
                  key={term}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 87, 168, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch(null, term);
                  }}
                  className="text-perfume-pink hover:text-white transition-colors"
                >
                  {term}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Filter and Sort Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-perfume-darkBrown/50 p-4 rounded-lg mb-8 border border-perfume-darkBrown/80"
            >
              <div className="flex justify-between items-center">
                <motion.button
                  className="flex items-center gap-2 text-perfume-pink hover:text-white transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Filters & Sort</span>
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </motion.button>
                
                {/* Small results count */}
                <span className="text-sm text-gray-400">{results.length} products found</span>
              </div>
              
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-perfume-darkBrown/80">
                      {/* Category Filter */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={filters.category}
                          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                          className="w-full bg-perfume-darkBrown border border-perfume-darkBrown/80 rounded-md px-3 py-2 text-sm"
                        >
                          <option value="">All Categories</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Gender Filter */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <select
                          value={filters.gender}
                          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                          className="w-full bg-perfume-darkBrown border border-perfume-darkBrown/80 rounded-md px-3 py-2 text-sm"
                        >
                          <option value="">All</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="unisex">Unisex</option>
                        </select>
                      </div>
                      
                      {/* Sort Options */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Sort By</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full bg-perfume-darkBrown border border-perfume-darkBrown/80 rounded-md px-3 py-2 text-sm"
                        >
                          <option value="relevance">Relevance</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="name-asc">Name: A-Z</option>
                          <option value="name-desc">Name: Z-A</option>
                        </select>
                      </div>
                      
                      {/* Apply Filters Button */}
                      <div className="md:col-span-3 flex justify-end mt-4">
                        <Button 
                          onClick={() => handleSearch(null)} 
                          variant="outline" 
                          className="mr-2"
                        >
                          Apply Filters
                        </Button>
                        <Button 
                          onClick={clearSearch} 
                          variant="ghost"
                        >
                          Reset All
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="mb-6 flex justify-between items-center"
            >
              <h2 className="text-2xl font-serif tracking-wider">
                {searchQuery ? `Results for "${searchQuery}"` : "All Fragrances"}
              </h2>
              <p className="text-gray-400">{results.length} items</p>
            </motion.div>
            
            {results.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="card-3d"
                    whileHover={{ scale: 1.03, y: -10 }}
                  >
                    <PerfumeCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                variants={itemVariants}
                className="text-center py-16"
              >
                <p className="text-2xl mb-4">No results found for "{searchQuery}"</p>
                <p className="text-gray-400 mb-8">Try adjusting your search or browse our categories</p>
                <Button onClick={clearSearch}>View All Fragrances</Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
