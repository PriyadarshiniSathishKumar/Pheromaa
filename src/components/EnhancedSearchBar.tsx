
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { products } from '@/data/products';

const EnhancedSearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const popularSearches = ['Rose', 'Woody', 'Citrus', 'Luxury', 'Unisex'];

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        navigate(`/product/${results[selectedIndex].id}`);
        setIsOpen(false);
        setQuery('');
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const filteredResults = products
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
    
    setResults(filteredResults);
    setSelectedIndex(-1);
  }, [query]);
  
  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative z-50">
      {!isOpen ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="p-2 text-white"
          aria-label="Open search"
        >
          <Search size={20} />
        </motion.button>
      ) : (
        <motion.div 
          initial={{ width: 40, opacity: 0.5 }}
          animate={{ width: 300, opacity: 1 }}
          exit={{ width: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative flex items-center"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search fragrances..."
            className="w-full pl-10 pr-10 py-2 rounded-full bg-perfume-darkBrown/80 border border-perfume-pink/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-perfume-pink/50"
          />
          
          <Search size={18} className="absolute left-3 text-gray-400" />
          
          <button
            onClick={() => {
              if (query) {
                setQuery('');
              } else {
                setIsOpen(false);
              }
            }}
            className="absolute right-3 text-gray-400 hover:text-white"
            aria-label={query ? "Clear search" : "Close search"}
          >
            <X size={18} />
          </button>
          
          {/* Search suggestions */}
          <AnimatePresence>
            {isOpen && (results.length > 0 || query.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 w-full mt-2 bg-perfume-darkBrown/90 backdrop-blur-md rounded-lg shadow-xl border border-perfume-pink/20 overflow-hidden"
              >
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((product, index) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        className={`px-4 py-2 cursor-pointer flex items-center gap-3 ${selectedIndex === index ? 'bg-perfume-pink/20' : ''}`}
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setIsOpen(false);
                          setQuery('');
                        }}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{product.name}</p>
                          <p className="text-gray-400 text-xs">{product.category}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : query.length > 0 ? (
                  <div className="p-4 text-center text-gray-300">
                    No results found for "{query}"
                    <button
                      onClick={handleSearch}
                      className="block mx-auto mt-2 text-perfume-pink hover:underline"
                    >
                      Search all products
                    </button>
                  </div>
                ) : null}
                
                {/* Popular searches */}
                <div className="px-4 py-3 border-t border-perfume-pink/10">
                  <p className="text-xs text-gray-400 mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map(term => (
                      <motion.button
                        key={term}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="text-xs px-2 py-1 rounded-full bg-perfume-pink/20 text-white hover:bg-perfume-pink/30 transition-colors"
                      >
                        {term}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
