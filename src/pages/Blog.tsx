
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '@/components/BlogPost';

const Blog: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string>('all');
  const [sortedPosts, setSortedPosts] = useState(blogPosts);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category.toLowerCase())))];
  
  useEffect(() => {
    if (category === 'all') {
      setSortedPosts(blogPosts);
    } else {
      setSortedPosts(blogPosts.filter(post => post.category.toLowerCase() === category));
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog">Fragrance Journal</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            ref={containerRef}
            style={{ opacity, scale }}
            className="relative"
          >
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif mb-6 tracking-wider text-center"
            >
              Fragrance Journal
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center text-gray-300 max-w-2xl mx-auto mb-10"
            >
              Explore our collection of fragrance insights, trends, and stories. Dive into the world of scents and discover the art of perfumery.
            </motion.p>
            
            {/* Category filter */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className={`px-4 py-2 rounded-full transition-all ${
                    category === cat 
                      ? 'bg-perfume-pink text-black font-medium shadow-lg shadow-perfume-pink/20' 
                      : 'bg-perfume-darkBrown text-white hover:bg-perfume-darkBrown/70'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post, index) => {
                return (
                  <BlogCard key={post.id} post={post} index={index} />
                );
              })}
            </div>
            
            {/* Empty state */}
            {sortedPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-xl mb-4">No posts found in this category</p>
                <motion.button 
                  onClick={() => setCategory('all')}
                  className="text-perfume-pink hover:underline"
                  whileHover={{ scale: 1.05, color: "#ff9db0" }}
                  whileTap={{ scale: 0.95 }}
                >
                  View all posts
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Separate BlogCard component with in-view animations
const BlogCard = ({ post, index }: { post: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };
  
  return (
    <motion.article 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="bg-perfume-darkBrown rounded-lg overflow-hidden group hover:shadow-xl hover:shadow-perfume-pink/10 transition-all duration-500 cursor-pointer"
    >
      <div className="h-56 overflow-hidden relative">
        <motion.img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="flex justify-between items-center mb-2"
        >
          <span className="text-perfume-pink text-sm">{post.category}</span>
          <span className="text-gray-400 text-xs">{post.date}</span>
        </motion.div>
        
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="text-xl font-serif mb-3 tracking-wider group-hover:text-perfume-pink transition-colors"
        >
          {post.title}
        </motion.h3>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="text-gray-300 mb-4 line-clamp-3"
        >
          {post.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          whileHover={{ x: 5 }}
        >
          <span 
            className="text-perfume-pink hover:text-white transition-colors inline-flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default Blog;
