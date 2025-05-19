
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, updateCartItemQuantity, removeFromCart, cartTotal, clearCart } = useShop();
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-perfume-black text-white">
        <NavBar />
        
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="mx-auto h-20 w-20 text-gray-400 mb-6" />
            <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any fragrances to your cart yet.
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
        <h1 className="text-3xl font-serif mb-10 text-center md:text-left">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-perfume-darkBrown/50 rounded-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-5 p-4 bg-gray-900/50 text-sm font-medium">
                <div className="col-span-2">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              
              <div className="divide-y divide-gray-800">
                {cart.map((item) => (
                  <motion.div 
                    key={item.product.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center"
                  >
                    <div className="md:col-span-2 flex items-center gap-4">
                      <Link to={`/product/${item.product.id}`} className="w-20 h-20 relative rounded overflow-hidden flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </Link>
                      <div>
                        <Link to={`/product/${item.product.id}`} className="font-medium hover:text-perfume-pink">
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-400">{item.product.size}ml</p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex items-center text-sm text-red-500 hover:text-red-400 mt-2 md:hidden"
                        >
                          <Trash2 size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-center md:block flex justify-between">
                      <span className="md:hidden">Price:</span>
                      <span>₹{item.product.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-gray-700 rounded">
                        <button
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-800"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="px-3 py-1 min-w-[40px] text-center">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-800"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:text-right flex justify-between md:block">
                      <span className="md:hidden">Total:</span>
                      <div className="flex items-center gap-4 md:justify-end">
                        <span className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-400 hidden md:inline-block"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-800 bg-gray-900/30 flex justify-between">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-gray-400 hover:text-white"
                >
                  Clear Cart
                </Button>
                <Button asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-perfume-darkBrown/50 rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax (18% GST)</span>
                  <span>₹{(cartTotal * 0.18).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{(cartTotal * 1.18).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Including 18% GST</p>
                </div>
                
                <div className="pt-4">
                  <Button asChild className="w-full bg-perfume-pink text-black hover:bg-opacity-90">
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <h3 className="font-medium mb-2">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="bg-gray-800 p-2 rounded">Visa</div>
                    <div className="bg-gray-800 p-2 rounded">MasterCard</div>
                    <div className="bg-gray-800 p-2 rounded">UPI</div>
                    <div className="bg-gray-800 p-2 rounded">PayTM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
