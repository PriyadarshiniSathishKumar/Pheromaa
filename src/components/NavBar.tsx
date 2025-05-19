
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="md:hidden p-1" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          <Link to="/" className="text-2xl font-serif tracking-widest text-white text-glow">
            PHEROMA
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-perfume-pink transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-perfume-pink transition-colors">
            Shop
          </Link>
          <Link to="/collections" className="text-white hover:text-perfume-pink transition-colors">
            Collections
          </Link>
          <Link to="/about" className="text-white hover:text-perfume-pink transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink">
              <Search size={20} />
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink">
              <User size={20} />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink">
              <Heart size={20} />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-white hover:text-perfume-pink">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 bg-perfume-pink text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-black/95 pt-16 px-8 flex flex-col z-40 transition-transform duration-300 ease-in-out transform",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
