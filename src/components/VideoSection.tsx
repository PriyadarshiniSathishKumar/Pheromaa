
import React from 'react';
import { motion } from 'framer-motion';

const VideoSection: React.FC = () => {
  return (
    <section className="py-20 bg-black flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-md mx-auto"
      >
        <div className="relative pb-4 h-[714px] w-full max-w-[345px] mx-auto">
          <iframe 
            src="https://assets.pinterest.com/ext/embed.html?id=9710955442271034" 
            height="714" 
            width="345" 
            frameBorder="0" 
            scrolling="no" 
            title="Pinterest Perfume Video"
            className="absolute top-0 left-0 w-full h-full shadow-2xl rounded-lg"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
