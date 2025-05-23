
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnClickable, setIsOnClickable] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Use spring for smooth movement
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
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

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousemove', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousemove', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            cursor: none !important;
          }
        `
      }} />

      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isVisible ? (isOnClickable ? 1.5 : 1) : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 }
        }}
      >
        {/* Enhanced perfume bottle cursor */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            animate={isClicking ? { scale: 0.8 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Bottle body */}
            <motion.path 
              d="M8 8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8Z" 
              fill="#c59dff"
              animate={isOnClickable ? { fill: "#ff57a8" } : { fill: "#c59dff" }}
            />
            
            {/* Bottle neck */}
            <motion.path 
              d="M10.5 3H13.5C13.7761 3 14 3.22386 14 3.5V6H10V3.5C10 3.22386 10.2239 3 10.5 3Z" 
              fill="#c59dff"
              animate={isOnClickable ? { fill: "#ff57a8" } : { fill: "#c59dff" }}
            />
            
            {/* Cap */}
            <motion.rect 
              x="9.5" 
              y="2" 
              width="5" 
              height="2" 
              rx="1" 
              fill="#c59dff"
              animate={isOnClickable ? { fill: "#ff57a8" } : { fill: "#c59dff" }}
            />
          </motion.g>
          
          {/* Animated perfume mist */}
          <motion.g
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [-2, -8, -15],
              x: [0, 1, -1, 2]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeOut"
            }}
          >
            <circle cx="13" cy="1" r="1" fill="#c59dff" fillOpacity="0.6" />
            <circle cx="11" cy="-1" r="0.8" fill="#c59dff" fillOpacity="0.4" />
            <circle cx="15" cy="0" r="1.2" fill="#c59dff" fillOpacity="0.3" />
          </motion.g>
        </svg>
      </motion.div>
      
      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border border-perfume-pink/50"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ 
            width: 10, 
            height: 10,
            opacity: 0.8,
            translateX: "-50%",
            translateY: "-50%"
          }}
          animate={{ 
            width: 60, 
            height: 60,
            opacity: 0,
            translateX: "-50%",
            translateY: "-50%"
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
