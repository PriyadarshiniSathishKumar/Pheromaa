
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();
  
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-perfume-black text-white">
        <NavBar />
        
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="mx-auto h-20 w-20 text-gray-400 mb-6" />
            <h1 className="text-3xl font-serif mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 mb-8">
              Save your favorite fragrances for later by adding them to your wishlist.
            </p>
            <Button asChild>
              <Link to="/products">Discover Our Collection</Link>
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-3xl font-serif mb-10 text-center md:text-left">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-perfume-darkBrown/50 rounded-lg overflow-hidden group relative"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
              </div>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="text-lg font-medium hover:text-perfume-pink transition-colors">
                  {product.name}
                </Link>
                <p className="text-gray-300 mt-1">₹{product.price.toLocaleString()}</p>
                
                <div className="mt-4 flex">
                  <Button 
                    onClick={() => addToCart(product)} 
                    className="w-full bg-perfume-pink text-black hover:bg-opacity-90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
