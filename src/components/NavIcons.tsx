
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, BookOpen, MessageSquare } from 'lucide-react';

interface NavIconProps {
  icon: React.ReactNode;
  to: string;
  tooltip: string;
  delay?: number;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, to, tooltip, delay = 0 }) => {
  return (
    <Link to={to} className="relative group">
      <motion.div
        whileHover={{ 
          scale: 1.2,
          y: -5,
          transition: { type: "spring", stiffness: 300 }
        }}
        className="text-white hover:text-perfume-pink transition-colors p-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay, duration: 0.5 }}
      >
        {icon}
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {tooltip}
        </span>
      </motion.div>
    </Link>
  );
};

const NavIcons: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavIcon 
        icon={
          <motion.div
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1 }}
          >
            <Home size={24} />
          </motion.div>
        } 
        to="/" 
        tooltip="Home"
        delay={0.1}
      />
      
      <NavIcon 
        icon={
          <motion.div
            animate={{ 
              rotate: [0, 15, 0, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
          >
            <ShoppingBag size={24} />
          </motion.div>
        } 
        to="/products" 
        tooltip="Shop"
        delay={0.2}
      />
      
      <NavIcon 
        icon={
          <motion.div
            animate={{ 
              y: [0, -5, 0, -5, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 3, delay: 2 }}
          >
            <img 
              src="/lovable-uploads/b6410b8a-f54a-4092-a1ec-439b37c435b6.png" 
              alt="Collections" 
              className="w-6 h-6 object-contain"
            />
          </motion.div>
        } 
        to="/collections" 
        tooltip="Collections"
        delay={0.3}
      />
      
      <NavIcon 
        icon={
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 3, delay: 2.5 }}
          >
            <BookOpen size={24} />
          </motion.div>
        } 
        to="/about" 
        tooltip="About"
        delay={0.4}
      />
      
      <NavIcon 
        icon={
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 3, delay: 3 }}
          >
            <MessageSquare size={24} />
          </motion.div>
        } 
        to="/blog" 
        tooltip="Blog"
        delay={0.5}
      />
    </div>
  );
};

export default NavIcons;
