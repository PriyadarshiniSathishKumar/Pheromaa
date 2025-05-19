
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Minus, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import PerfumeCard from '@/components/PerfumeCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  
  const product = products.find((p) => p.id === id);
  const relatedProducts = products
    .filter((p) => p.id !== id && (p.category === product?.category || p.gender === product?.gender))
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-perfume-black text-white">
        <NavBar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-serif mb-6">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
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
  
  const nextImage = () => {
    setActiveImageIndex((activeImageIndex + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((activeImageIndex - 1 + product.images.length) % product.images.length);
  };
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-10">
          <Button asChild variant="ghost" className="hover:bg-gray-800/50">
            <Link to="/products">
              <ArrowLeft size={16} className="mr-2" /> Back to Products
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="relative">
            <motion.div 
              key={activeImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-perfume-darkBrown/40 mb-4"
            >
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className={`w-full h-full object-contain p-8 ${getGlowColor()}`}
              />
              {product.isLimited && (
                <div className="absolute top-4 left-4 bg-perfume-gold px-3 py-1 text-sm font-semibold rounded">
                  Limited Edition
                </div>
              )}
            </motion.div>
            
            {product.images.length > 1 && (
              <div className="flex justify-center gap-4 relative">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2"
                >
                  <ArrowLeft size={16} />
                </Button>
                
                <div className="flex gap-2 overflow-x-auto py-2 max-w-[80%] justify-center">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "w-16 h-16 rounded border-2",
                        activeImageIndex === idx ? "border-perfume-pink" : "border-transparent"
                      )}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - View ${idx + 1}`} 
                        className="w-full h-full object-cover rounded" 
                      />
                    </button>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-serif mb-2">{product.name}</h1>
              <p className="text-2xl font-light">₹{product.price.toLocaleString()}</p>
              
              {product.inStock ? (
                <div className="inline-flex items-center bg-green-900/30 text-green-400 px-3 py-1 rounded text-sm mt-4">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span> In Stock
                </div>
              ) : (
                <div className="inline-flex items-center bg-red-900/30 text-red-400 px-3 py-1 rounded text-sm mt-4">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span> Out of Stock
                </div>
              )}
            </div>
            
            <p className="text-gray-300 mb-6">{product.description}</p>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Fragrance Notes</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-perfume-pink">Top Notes</h4>
                  <ul className="text-sm text-gray-300">
                    {product.topNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-perfume-pink">Heart Notes</h4>
                  <ul className="text-sm text-gray-300">
                    {product.middleNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-perfume-pink">Base Notes</h4>
                  <ul className="text-sm text-gray-300">
                    {product.baseNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Size</span>
                  <span>{product.size}ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gender</span>
                  <span className="capitalize">{product.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Limited Edition</span>
                  <span>{product.isLimited ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              {product.inStock ? (
                <>
                  <div className="flex items-center border border-gray-700 rounded">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-4 py-2 hover:bg-gray-800"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="px-4 py-2 min-w-[50px] text-center">
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-800"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <Button 
                    onClick={() => addToCart(product, quantity)} 
                    className={`flex-grow ${getButtonColor()} text-black hover:bg-opacity-90`}
                  >
                    <ShoppingBag size={18} className="mr-2" /> Add to Cart
                  </Button>
                </>
              ) : (
                <Button disabled className="flex-grow bg-gray-700 text-gray-300 cursor-not-allowed">
                  Out of Stock
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className={cn(
                  "border-gray-700 hover:bg-gray-800/50",
                  isInWishlist(product.id) && "border-perfume-pink"
                )}
              >
                <Heart 
                  size={18} 
                  className={cn(
                    isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-white"
                  )} 
                />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <PerfumeCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
