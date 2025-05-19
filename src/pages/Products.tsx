
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PerfumeCard from '@/components/PerfumeCard';
import { Button } from '@/components/ui/button';
import { products, categories, genders } from '@/data/products';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Products: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [limitedOnly, setLimitedOnly] = useState(false);
  
  const applyFilters = useCallback(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply gender filter
    if (selectedGender !== 'all') {
      result = result.filter(product => product.gender === selectedGender);
    }
    
    // Apply price filter
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply limited edition filter
    if (limitedOnly) {
      result = result.filter(product => product.isLimited);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, selectedGender, priceRange, sortBy, limitedOnly]);
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGender('all');
    setPriceRange({ min: 0, max: 10000 });
    setLimitedOnly(false);
    setSortBy('featured');
  };
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-perfume-darkBrown to-black"></div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-perfume-pink/40 to-transparent"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wider">Discover Your Signature Scent</h1>
            <p className="text-gray-300 max-w-2xl mx-auto px-4">
              Browse our curated collection of premium fragrances designed to awaken your senses and enhance your personal style.
            </p>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
              <div className="w-full md:w-1/2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-perfume-pink"
                />
              </div>
              
              <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Filter size={16} className="mr-2" />
                  Filters {showFilters && <X size={16} className="ml-2" />}
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-gray-900 border-gray-800">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-lg p-6 mb-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">Filters</h3>
                  <Button variant="ghost" onClick={resetFilters}>Reset All</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Categories */}
                  <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            type="radio"
                            id={`category-${category.id}`}
                            name="category"
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                            className="mr-3 h-4 w-4 accent-perfume-pink"
                          />
                          <label htmlFor={`category-${category.id}`}>{category.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gender */}
                  <div>
                    <h4 className="font-medium mb-3">Gender</h4>
                    <div className="space-y-2">
                      {genders.map((gender) => (
                        <div key={gender.id} className="flex items-center">
                          <input
                            type="radio"
                            id={`gender-${gender.id}`}
                            name="gender"
                            checked={selectedGender === gender.id}
                            onChange={() => setSelectedGender(gender.id)}
                            className="mr-3 h-4 w-4 accent-perfume-pink"
                          />
                          <label htmlFor={`gender-${gender.id}`}>{gender.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range & Limited Edition */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <span>₹</span>
                        <input
                          type="number"
                          min="0"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                        />
                        <span>to</span>
                        <span>₹</span>
                        <input
                          type="number"
                          min="0"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                        />
                      </div>
                      
                      <div className="flex items-center mt-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="limited-edition" 
                            checked={limitedOnly} 
                            onCheckedChange={() => setLimitedOnly(!limitedOnly)}
                          />
                          <label htmlFor="limited-edition">Limited Edition Only</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <PerfumeCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl mb-4">No Products Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
