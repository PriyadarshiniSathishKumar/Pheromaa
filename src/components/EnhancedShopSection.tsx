
import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

const EnhancedShopSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const collections = [
    {
      title: "Signature Collection",
      description: "Our most beloved fragrances",
      image: "/lovable-uploads/61c4de73-1a6f-4d20-94af-949fcba84ca2.png",
      path: "/collections/signature",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Limited Edition",
      description: "Exclusive seasonal scents",
      image: "/lovable-uploads/34d937cd-3f7a-4fd4-8d66-31875f61c372.png",
      path: "/collections/limited",
      color: "from-pink-500 to-orange-500"
    },
    {
      title: "Artisan Series",
      description: "Handcrafted masterpieces",
      image: "/lovable-uploads/45d25ded-2f0f-4e7f-bbf4-804fe0d8de69.png",
      path: "/collections/artisan",
      color: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black via-perfume-darkBrown to-black relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ 
          y: backgroundY,
          backgroundImage: "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ y: textY }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl lg:text-7xl font-serif mb-6 tracking-wider"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              className="inline-block"
              animate={{
                background: [
                  "linear-gradient(45deg, #ffffff, #c59dff, #ff57a8)",
                  "linear-gradient(45deg, #ff57a8, #ffffff, #c59dff)",
                  "linear-gradient(45deg, #c59dff, #ff57a8, #ffffff)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 5 }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 200%"
              }}
            >
              EXPLORE
            </motion.span>
            <br />
            <motion.span
              className="text-perfume-pink"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 87, 168, 0.5)",
                  "0 0 40px rgba(255, 87, 168, 0.8)",
                  "0 0 20px rgba(255, 87, 168, 0.5)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              COLLECTIONS
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover our curated collections, each telling a unique olfactory story
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              whileHover={{ 
                y: -20,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative"
            >
              <Link to={collection.path}>
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <motion.img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-0 group-hover:opacity-70`}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.7 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Floating stars */}
                    <div className="absolute inset-0">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: Math.random() * 3 + 2,
                            delay: Math.random() * 2
                          }}
                        >
                          <Star size={8} className="text-white" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-serif mb-2 text-white group-hover:text-perfume-pink transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {collection.title}
                    </motion.h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {collection.description}
                    </p>
                    
                    <motion.div
                      className="mt-4 flex items-center text-perfume-pink opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <span className="text-sm">Explore</span>
                      <ArrowRight size={16} className="ml-2" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-black hover:bg-perfume-pink hover:text-white transition-all duration-300 group"
          >
            <Link to="/products" className="flex items-center">
              <motion.span
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Shop All Products
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EnhancedShopSection;
