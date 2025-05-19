
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', () => setIsVisible(true));
    window.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', () => setIsVisible(true));
      window.removeEventListener('mouseleave', () => setIsVisible(false));
    };
  }, [isVisible]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            cursor: none;
          }
          a, button, input, textarea, select, [role="button"] {
            cursor: none;
          }
        `
      }} />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V10.5C16 11.3284 15.3284 12 14.5 12H9.5C8.67157 12 8 11.3284 8 10.5V5Z" fill="#c59dff" />
          <path d="M12 12V21M8 21H16" stroke="#c59dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </>
  );
};

export default CustomCursor;
