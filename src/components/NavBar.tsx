
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleSearchClick = () => {
    navigate('/search');
  };
  
  const handleProfileClick = () => {
    navigate('/account');
  };
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "backdrop-blur-lg bg-black/80 py-2" : "backdrop-blur-md bg-black/30 py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="md:hidden p-1" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          <Link to="/" className="text-2xl font-serif tracking-widest text-white">
            <motion.div
              initial={{ opacity: 1 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
              }}
              className="flex items-center"
            >
              <motion.span 
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: [1, 0.8, 1],
                  textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                PHEROMA
              </motion.span>
            </motion.div>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-perfume-pink transition-colors">
            <span className="relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-perfume-pink group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <Link to="/products" className="text-white hover:text-perfume-pink transition-colors">
            <span className="relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-perfume-pink group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <Link to="/collections" className="text-white hover:text-perfume-pink transition-colors">
            <span className="relative group">
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-perfume-pink group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <Link to="/about" className="text-white hover:text-perfume-pink transition-colors">
            <span className="relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-perfume-pink group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-perfume-pink"
              onClick={handleSearchClick}
            >
              <Search size={20} />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-perfume-pink"
              onClick={handleProfileClick}
            >
              <User size={20} />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink">
                <Heart size={20} />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink relative">
                <ShoppingCart size={20} />
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-1 right-1 bg-perfume-pink text-black text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >
                  0
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed inset-0 bg-black/95 pt-16 px-8 flex flex-col z-40"
          >
            <div className="flex flex-col space-y-8 text-lg py-8">
              <Link to="/" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/collections" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                Collections
              </Link>
              <Link to="/about" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/blog" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link to="/contact" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
