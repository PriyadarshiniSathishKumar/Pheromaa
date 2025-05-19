
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PerfumeCardProps {
  product: Product;
}

const PerfumeCard: React.FC<PerfumeCardProps> = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const getGlowColor = () => {
    switch (product.ribbonColor) {
      case 'pink': return 'pink-glow';
      case 'green': return 'green-glow';
      case 'purple': return 'purple-glow';
      default: return 'pink-glow';
    }
  };
  
  const getButtonColor = () => {
    switch (product.ribbonColor) {
      case 'pink': return 'bg-perfume-pink';
      case 'green': return 'bg-perfume-green';
      case 'purple': return 'bg-perfume-purple';
      default: return 'bg-perfume-pink';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-perfume-darkBrown rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
    >
      {product.isLimited && (
        <div className="absolute top-2 left-2 bg-perfume-gold px-2 py-1 text-xs font-semibold rounded z-10">
          Limited Edition
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 bg-black/30 backdrop-blur-sm hover:bg-black/50"
      >
        <Heart 
          size={18} 
          className={cn(
            "transition-colors",
            isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-white"
          )} 
        />
      </Button>
      
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getGlowColor()} bottleGlow`}></div>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold tracking-wider text-white">{product.name}</h3>
          <p className="text-gray-300 mt-1">₹{product.price.toLocaleString()}</p>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">{product.description}</p>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <Button 
          onClick={() => addToCart(product)} 
          className={`w-full ${getButtonColor()} text-black hover:bg-opacity-90`}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default PerfumeCard;
