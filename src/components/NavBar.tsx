
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, ShoppingCart, User, X, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import NavIcons from "./NavIcons";
import EnhancedSearchBar from "./EnhancedSearchBar";

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
  
  const menuVariants = {
    closed: { 
      x: "-100%",
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 40
      }
    },
    open: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };
  
  return (
    <motion.nav 
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
      variants={{
        top: { 
          backgroundColor: "rgba(0, 0, 0, 0.3)", 
          backdropFilter: "blur(8px)",
          height: "80px",
          paddingTop: "16px",
          paddingBottom: "16px"
        },
        scrolled: { 
          backgroundColor: "rgba(0, 0, 0, 0.85)", 
          backdropFilter: "blur(12px)",
          height: "60px",
          paddingTop: "8px",
          paddingBottom: "8px",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
        }
      }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="md:hidden p-1" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-cursor-text={isMenuOpen ? "Close Menu" : "Open Menu"}
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
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-perfume-pink"
          >
            <EnhancedSearchBar />
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
              data-cursor-text="Profile"
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
            <Link to="/wishlist" data-cursor-text="Wishlist">
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
            <Link to="/cart" data-cursor-text="Cart">
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
      
      {/* Mobile Menu with advanced animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-gradient-to-b from-black/95 to-perfume-darkBrown/95 pt-16 px-8 flex flex-col z-40 backdrop-blur-lg"
          >
            <div className="flex flex-col space-y-2 text-lg py-8">
              {[
                { path: "/", label: "Home" },
                { path: "/products", label: "Shop" },
                { path: "/collections", label: "Collections" },
                { path: "/about", label: "About" },
                { path: "/blog", label: "Blog" },
                { path: "/sustainability", label: "Sustainability" },
                { path: "/shipping", label: "Shipping & Returns" },
                { path: "/faq", label: "FAQ" }
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  variants={menuItemVariants}
                  custom={index}
                  whileHover={{ x: 10, color: "#ff57a8" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link 
                    to={item.path} 
                    className="text-white text-2xl font-serif tracking-wider block py-3"
                    onClick={() => setIsMenuOpen(false)}
                    data-cursor-text={`Go to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              variants={menuItemVariants} 
              className="mt-auto pb-8 flex justify-center space-x-8"
            >
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-white hover:text-perfume-pink"
                data-cursor-text="Facebook"
              >
                <Facebook size={28} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-white hover:text-perfume-pink"
                data-cursor-text="Instagram"
              >
                <Instagram size={28} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-white hover:text-perfume-pink"
                data-cursor-text="Twitter"
              >
                <Twitter size={28} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
