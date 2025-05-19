
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ShopProvider } from "@/context/ShopContext";
import CustomCursor from "@/components/CustomCursor";
import PerfumeSplash from "@/components/PerfumeSplash";
import { useState, useEffect } from "react";

import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Sustainability from "./pages/Sustainability";
import Shipping from "./pages/Shipping";
import FAQ from "./pages/FAQ";
import Collections from "./pages/Collections";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Component to handle route changes and trigger splash effect
const RouteChangeHandler = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const [splashColor, setSplashColor] = useState("#c59dff");

  useEffect(() => {
    // Different splash colors for different routes
    if (location.pathname.includes("/products")) {
      setSplashColor("#ff9db0"); // Pink
    } else if (location.pathname.includes("/collections")) {
      setSplashColor("#a3ff9d"); // Green
    } else if (location.pathname.includes("/about")) {
      setSplashColor("#d4af37"); // Gold
    } else if (location.pathname.includes("/blog")) {
      setSplashColor("#c59dff"); // Purple
    } else {
      setSplashColor("#c59dff"); // Default purple
    }
    
    setShowSplash(true);
  }, [location.pathname]);

  return <PerfumeSplash isActive={showSplash} color={splashColor} onComplete={() => setShowSplash(false)} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ShopProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CustomCursor />
          <RouteChangeHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:type" element={<Collections />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/account" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ShopProvider>
  </QueryClientProvider>
);

export default App;
