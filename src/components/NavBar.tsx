import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, User, X, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import NavIcons from "./NavIcons";

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

  const AnimatedIcon = ({ icon: Icon, delay = 0 }) => (
    <motion.div 
      whileHover={{ scale: 1.2, rotate: 360 }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <Icon size={20} />
    </motion.div>
  );
  
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
            {isMenuOpen ? <AnimatedIcon icon={X} /> : <AnimatedIcon icon={Menu} />}
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
                animate={{ 
                  opacity: [1, 0.8, 1],
                  textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"],
                  rotateY: [0, 5, 0, -5, 0]
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
        
        <NavIcons />
        
        <div className="flex items-center space-x-5">
          <motion.div 
            whileHover={{ scale: 1.2 }} 
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-perfume-pink"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-perfume-pink"
              onClick={handleSearchClick}
            >
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                <Search size={20} />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.2 }} 
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-perfume-pink"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-perfume-pink"
              onClick={handleProfileClick}
            >
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
              >
                <User size={20} />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.2 }} 
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-perfume-pink"
          >
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, 0, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3, delay: 2 }}
                >
                  <Heart size={20} />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.2 }} 
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-perfume-pink"
          >
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, 0, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3, delay: 2.5 }}
                >
                  <ShoppingCart size={20} />
                </motion.div>
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
              <Link to="/sustainability" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sustainability
              </Link>
              <Link to="/shipping" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                Shipping & Returns
              </Link>
              <Link to="/faq" className="text-white hover:text-perfume-pink transition-colors" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
            </div>
            
            <div className="mt-auto pb-8 flex justify-center space-x-6">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-white hover:text-perfume-pink"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-white hover:text-perfume-pink"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-white hover:text-perfume-pink"
              >
                <Twitter size={24} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
