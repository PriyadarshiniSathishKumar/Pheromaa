
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface LocationState {
  orderNumber: string;
  orderTotal: number;
  paymentMethod: string;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  
  useEffect(() => {
    // If user navigates directly to this page without state, redirect to home
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);
  
  if (!state) {
    return null;
  }
  
  const { orderNumber, orderTotal, paymentMethod } = state;
  
  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto bg-perfume-darkBrown/50 rounded-lg p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
          
          <h1 className="text-3xl font-serif mb-2">Order Confirmed!</h1>
          <p className="text-gray-300 mb-8">Thank you for shopping with PHEROMA</p>
          
          <div className="bg-gray-900/50 rounded-lg p-6 mb-8 text-left">
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Date:</span>
              <span>{new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Payment Method:</span>
              <span className="capitalize">{paymentMethod}</span>
            </div>
            
            <div className="flex justify-between pt-4 border-t border-gray-800">
              <span className="text-gray-300">Total Amount:</span>
              <span className="font-medium">₹{orderTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="mb-8">
            We've sent an email confirmation with all the details to your email address. You will receive another notification when your order ships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/account/orders">
                <ShoppingBag size={16} className="mr-2" /> View Orders
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
