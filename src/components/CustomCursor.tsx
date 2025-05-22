
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnClickable, setIsOnClickable] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if element or its parent is clickable
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable')
      ) {
        setIsOnClickable(true);
      } else {
        setIsOnClickable(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousemove', handleMouseOver);
    window.addEventListener('mouseenter', () => setIsVisible(true));
    window.addEventListener('mouseleave', () => setIsVisible(false));
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mousemove', handleMouseOver);
      window.addEventListener('mouseenter', () => setIsVisible(true));
      window.addEventListener('mouseleave', () => setIsVisible(false));
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
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
          .clickable {
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
        {/* Perfume bottle cursor */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M8 5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V10.5C16 11.3284 15.3284 12 14.5 12H9.5C8.67157 12 8 11.3284 8 10.5V5Z" 
            fill="#c59dff"
            animate={isClicking ? { scale: 0.9 } : { scale: 1 }}
          />
          <motion.path 
            d="M12 12V21M8 21H16" 
            stroke="#c59dff" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={isClicking ? { scale: 0.9 } : { scale: 1 }}
          />
          
          {/* Animated perfume mist */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [-5, -8, -12],
              x: [0, 2, 1]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "easeOut",
              times: [0, 0.5, 1]
            }}
          >
            <circle cx="14" cy="0" r="1" fill="#c59dff" fillOpacity="0.5" />
            <circle cx="12" cy="-2" r="0.8" fill="#c59dff" fillOpacity="0.4" />
            <circle cx="10" cy="-1" r="1.2" fill="#c59dff" fillOpacity="0.3" />
          </motion.g>
        </svg>
      </motion.div>
      
      {/* Ripple effect on click */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full bg-perfume-pink/20"
          initial={{ 
            width: 10, 
            height: 10,
            x: position.x - 5,
            y: position.y - 5,
            opacity: 0.8 
          }}
          animate={{ 
            width: 80, 
            height: 80,
            x: position.x - 40,
            y: position.y - 40,
            opacity: 0 
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          onAnimationComplete={() => setIsClicking(false)}
        />
      )}

      {/* Enlarge effect on clickable elements */}
      {isOnClickable && (
        <motion.div
          className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-white/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 0.6,
            scale: 1.5,
            x: position.x,
            y: position.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          style={{
            width: "30px",
            height: "30px",
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
