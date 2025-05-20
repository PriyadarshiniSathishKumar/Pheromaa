
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPostProps[] = [
  {
    id: 1,
    title: 'The Art of Layering Fragrances',
    content: `
      <p>Layering fragrances is an art form that allows you to create a scent that's uniquely yours. When done correctly, layering can add depth, complexity, and longevity to your fragrance experience.</p>
      
      <h3>Why Layer Fragrances?</h3>
      <p>Layering fragrances gives you the opportunity to:</p>
      <ul>
        <li>Create a signature scent that's uniquely yours</li>
        <li>Enhance certain notes in a fragrance</li>
        <li>Add complexity to simple scents</li>
        <li>Extend the longevity of your perfume</li>
      </ul>
      
      <h3>How to Layer Effectively</h3>
      <p>The key to successful layering is understanding fragrance families and how different scents interact. Here are some tips:</p>
      
      <p><strong>1. Start with a Base</strong><br />
      Begin with a neutral, simple scent that can act as a foundation. Scents with vanilla, musk, or amber work well as bases.</p>
      
      <p><strong>2. Add Complexity</strong><br />
      Layer a more complex fragrance on top of your base. This could be a floral, oriental, or woody scent depending on your preference.</p>
      
      <p><strong>3. Consider Concentration</strong><br />
      Remember that eau de parfum is stronger than eau de toilette. Adjust your application accordingly to avoid overwhelming combinations.</p>
      
      <p><strong>4. Complementary Notes</strong><br />
      Choose fragrances that share at least one common note for a more harmonious blend.</p>
      
      <p>With practice and experimentation, you'll discover combinations that create an olfactory signature that's uniquely yours.</p>
    `,
    date: 'May 15, 2025',
    image: '/lovable-uploads/5778a9ee-c12b-4abf-95a1-60a4759e0426.png',
    category: 'Fragrance Tips'
  },
  {
    id: 2,
    title: 'Understanding Fragrance Notes',
    content: `
      <p>To truly appreciate and select the perfect perfume, understanding fragrance notes is essential. A well-crafted perfume unfolds over time, revealing different facets as it interacts with your skin.</p>
      
      <h3>The Three Layers of Fragrance</h3>
      
      <p><strong>Top Notes (Head Notes)</strong><br />
      These are the initial scents you perceive immediately after application. They're typically light, fresh, and evaporate quickly—usually within 15-30 minutes. Common top notes include citrus (lemon, bergamot), light fruits, and fresh herbs.</p>
      
      <p><strong>Middle Notes (Heart Notes)</strong><br />
      As the top notes fade, the middle notes emerge and form the "heart" of the fragrance. They typically last 2-4 hours and include floral notes (rose, jasmine), spices (cinnamon, cardamom), and green notes (grass, leaves).</p>
      
      <p><strong>Base Notes</strong><br />
      These emerge as the middle notes dissipate and form the foundation of the fragrance. Base notes are rich, deep, and long-lasting—sometimes perceptible for 5-10 hours or more. Common base notes include woods (sandalwood, cedarwood), amber, musk, vanilla, and resins.</p>
      
      <h3>Fragrance Families</h3>
      
      <p>Perfumes are often categorized into families based on their dominant characteristics:</p>
      
      <ul>
        <li><strong>Floral:</strong> Rose, jasmine, lily, etc.</li>
        <li><strong>Oriental:</strong> Warm, spicy notes with vanilla, amber</li>
        <li><strong>Woody:</strong> Cedarwood, sandalwood, vetiver</li>
        <li><strong>Fresh:</strong> Citrus, aquatic, green notes</li>
      </ul>
      
      <p>When sampling perfumes, give them time to develop on your skin. The true character of a fragrance can only be appreciated as it evolves through all three stages of notes.</p>
    `,
    date: 'May 10, 2025',
    image: '/lovable-uploads/cbdd91a3-4560-4d99-b5e2-6f90b665802f.png',
    category: 'Perfume Education'
  },
  {
    id: 3,
    title: 'The History of Perfumery in India',
    content: `
      <p>India has one of the richest and most ancient traditions of perfumery in the world, dating back over 5,000 years. The art of creating fragrance has been an integral part of Indian culture, used in religious ceremonies, ayurvedic medicine, and daily life.</p>
      
      <h3>Ancient Beginnings</h3>
      
      <p>Archaeological evidence suggests that the Indus Valley Civilization (3300-1300 BCE) already had knowledge of perfumery. Ancient texts like the Vedas mention aromatic materials used in rituals. The word "attar" (essential oil) is derived from the Sanskrit word "ittar" meaning perfume.</p>
      
      <h3>Traditional Techniques</h3>
      
      <p><strong>Deg-Bhapka Method</strong><br />
      This ancient distillation technique has been used for centuries to extract attars. It involves a copper still (deg) connected to a receiver (bhapka) by a bamboo pipe. The process captures the volatile aromatic compounds through steam distillation.</p>
      
      <p><strong>Enfleurage</strong><br />
      This technique uses layers of fat to absorb the fragrance from delicate flowers like jasmine and lotus, which are difficult to extract through distillation.</p>
      
      <h3>Famous Indian Fragrances</h3>
      
      <ul>
        <li><strong>Attar Mitti:</strong> The scent of earth after the first monsoon rain</li>
        <li><strong>Mogra:</strong> Indian jasmine with an intensely sweet, heady aroma</li>
        <li><strong>Kewda:</strong> A uniquely Indian scent derived from screw pine flowers</li>
        <li><strong>Rose:</strong> Indian rosa damascena is prized worldwide for its deep, complex aroma</li>
      </ul>
      
      <h3>Modern Indian Perfumery</h3>
      
      <p>Today, India remains one of the world's largest producers of essential oils and fragrance ingredients. Contemporary Indian perfumers are bringing traditional ingredients and techniques to global attention, creating modern interpretations of classic Indian fragrances.</p>
      
      <p>The rich heritage of Indian perfumery continues to influence global fragrance trends, particularly in the growing niche perfume market where authentic and traditional methods are highly valued.</p>
    `,
    date: 'May 5, 2025',
    image: '/lovable-uploads/2191ab81-b1c5-4781-aab4-99ffaf38ecd1.png',
    category: 'Fragrance History'
  }
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '1');
  
  const post = blogPosts.find(post => post.id === postId) || blogPosts[0];
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      <Link to="/blog" className="inline-flex items-center text-perfume-pink hover:text-white transition-colors mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Back to all articles
      </Link>
      
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-perfume-pink text-sm mb-2">{post.category} • {post.date}</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 tracking-wider">{post.title}</h1>
          
          <div className="h-80 md:h-96 overflow-hidden rounded-lg mb-10">
            <motion.img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            />
          </div>
          
          <div 
            className="prose prose-lg prose-invert mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPost;
