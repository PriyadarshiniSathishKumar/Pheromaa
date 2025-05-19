
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  // Calculate order total
  const tax = cartTotal * 0.18; // 18% GST
  const orderTotal = cartTotal + tax;
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const validateShippingInfo = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'postalCode'];
    const emptyFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    // Basic phone validation for India
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(shippingInfo.phone)) {
      toast.error('Please enter a valid 10-digit Indian phone number');
      return false;
    }
    
    return true;
  };
  
  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      setCurrentStep('payment');
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod) {
      setCurrentStep('confirmation');
      window.scrollTo(0, 0);
    } else {
      toast.error('Please select a payment method');
    }
  };
  
  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-confirmation', { 
      state: { 
        orderNumber: `PH-${Math.floor(100000 + Math.random() * 900000)}`,
        orderTotal,
        paymentMethod
      } 
    });
  };
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-3xl font-serif mb-6 text-center">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center w-full max-w-lg">
            <div className={`flex flex-col items-center flex-1 ${currentStep === 'shipping' ? 'text-perfume-pink' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'shipping' ? 'bg-perfume-pink text-black' : 'bg-gray-700'}`}>
                1
              </div>
              <span className="mt-2 text-sm">Shipping</span>
            </div>
            <div className={`h-px flex-1 ${currentStep === 'shipping' ? 'bg-gray-700' : 'bg-perfume-pink'}`}></div>
            <div className={`flex flex-col items-center flex-1 ${currentStep === 'payment' ? 'text-perfume-pink' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'payment' ? 'bg-perfume-pink text-black' : 'bg-gray-700'}`}>
                2
              </div>
              <span className="mt-2 text-sm">Payment</span>
            </div>
            <div className={`h-px flex-1 ${currentStep === 'confirmation' ? 'bg-perfume-pink' : 'bg-gray-700'}`}></div>
            <div className={`flex flex-col items-center flex-1 ${currentStep === 'confirmation' ? 'text-perfume-pink' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'confirmation' ? 'bg-perfume-pink text-black' : 'bg-gray-700'}`}>
                3
              </div>
              <span className="mt-2 text-sm">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <form onSubmit={handleSubmitShipping} className="bg-perfume-darkBrown/50 rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingInfoChange}
                      placeholder="Enter your full name"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      placeholder="Enter your email"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      placeholder="10-digit phone number"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      placeholder="Enter your address"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      placeholder="Enter your city"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      placeholder="Enter your state"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingInfoChange}
                      placeholder="Enter your postal code"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      className="bg-gray-900 border-gray-800 text-white"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/cart')}
                  >
                    Back to Cart
                  </Button>
                  <Button type="submit">Continue to Payment</Button>
                </div>
              </form>
            )}
            
            {currentStep === 'payment' && (
              <form onSubmit={handleSubmitPayment} className="bg-perfume-darkBrown/50 rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border border-gray-800 rounded-md bg-gray-900/50">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="h-4 w-4 accent-perfume-pink"
                    />
                    <label htmlFor="card" className="flex-1">Credit/Debit Card</label>
                    <div className="flex gap-2">
                      <div className="bg-gray-800 p-1 rounded text-xs">Visa</div>
                      <div className="bg-gray-800 p-1 rounded text-xs">MasterCard</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-gray-800 rounded-md bg-gray-900/50">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="h-4 w-4 accent-perfume-pink"
                    />
                    <label htmlFor="upi" className="flex-1">UPI</label>
                    <div className="flex gap-2">
                      <div className="bg-gray-800 p-1 rounded text-xs">GPay</div>
                      <div className="bg-gray-800 p-1 rounded text-xs">PhonePe</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-gray-800 rounded-md bg-gray-900/50">
                    <input
                      type="radio"
                      id="wallet"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                      className="h-4 w-4 accent-perfume-pink"
                    />
                    <label htmlFor="wallet" className="flex-1">Mobile Wallet</label>
                    <div className="flex gap-2">
                      <div className="bg-gray-800 p-1 rounded text-xs">PayTM</div>
                      <div className="bg-gray-800 p-1 rounded text-xs">Amazon Pay</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-gray-800 rounded-md bg-gray-900/50">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4 w-4 accent-perfume-pink"
                    />
                    <label htmlFor="cod" className="flex-1">Cash on Delivery</label>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('shipping')}
                  >
                    Back to Shipping
                  </Button>
                  <Button type="submit">Review Order</Button>
                </div>
              </form>
            )}
            
            {currentStep === 'confirmation' && (
              <div className="bg-perfume-darkBrown/50 rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6">Order Confirmation</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Shipping Address</h3>
                    <div className="bg-gray-900/50 p-4 rounded-md">
                      <p>{shippingInfo.fullName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
                      <p>{shippingInfo.country}</p>
                      <p className="mt-2">Phone: {shippingInfo.phone}</p>
                      <p>Email: {shippingInfo.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <div className="bg-gray-900/50 p-4 rounded-md">
                      {paymentMethod === 'card' && <p>Credit/Debit Card</p>}
                      {paymentMethod === 'upi' && <p>UPI</p>}
                      {paymentMethod === 'wallet' && <p>Mobile Wallet</p>}
                      {paymentMethod === 'cod' && <p>Cash on Delivery</p>}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Order Items</h3>
                    <div className="bg-gray-900/50 rounded-md overflow-hidden">
                      <div className="divide-y divide-gray-800">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex gap-4 p-4">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-400">{item.product.size}ml</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹{item.product.price.toLocaleString()}</p>
                              <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('payment')}
                  >
                    Back to Payment
                  </Button>
                  <Button onClick={handlePlaceOrder} className="bg-perfume-pink text-black hover:bg-opacity-90">
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="sticky top-24 bg-perfume-darkBrown/50 rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Items ({cart.reduce((count, item) => count + item.quantity, 0)})</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{orderTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Including 18% GST</p>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm leading-tight">{item.product.name}</p>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                            <span className="text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Checkout;
