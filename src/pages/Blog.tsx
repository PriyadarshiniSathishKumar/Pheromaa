
import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Layering Fragrances',
      excerpt: 'Discover how to create your own unique scent by layering multiple fragrances...',
      date: 'May 15, 2025',
      image: '/lovable-uploads/5778a9ee-c12b-4abf-95a1-60a4759e0426.png',
      category: 'Fragrance Tips'
    },
    {
      id: 2,
      title: 'Understanding Fragrance Notes',
      excerpt: 'Learn about top, middle, and base notes and how they work together to create a complete perfume...',
      date: 'May 10, 2025',
      image: '/lovable-uploads/cbdd91a3-4560-4d99-b5e2-6f90b665802f.png',
      category: 'Perfume Education'
    },
    {
      id: 3,
      title: 'The History of Perfumery in India',
      excerpt: 'Explore the rich history of perfume-making in the Indian subcontinent, from ancient times to modern day...',
      date: 'May 5, 2025',
      image: '/lovable-uploads/2191ab81-b1c5-4781-aab4-99ffaf38ecd1.png',
      category: 'Fragrance History'
    }
  ];

  return (
    <div className="min-h-screen bg-perfume-black text-white">
      <NavBar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Fragrance Journal</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-12 tracking-wider text-center">Fragrance Journal</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-perfume-darkBrown rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-perfume-pink text-sm mb-2">{post.category} • {post.date}</div>
                    <h3 className="text-xl font-serif mb-3 tracking-wider">{post.title}</h3>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="text-perfume-pink hover:text-white transition-colors inline-flex items-center">
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
