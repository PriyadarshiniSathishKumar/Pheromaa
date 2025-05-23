
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnClickable, setIsOnClickable] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Enhanced spring configuration for smoother movement
  const springConfig = { damping: 15, stiffness: 500, mass: 0.1 };
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
          scale: isVisible ? (isOnClickable ? 1.8 : 1) : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          scale: { type: "spring", damping: 15, stiffness: 400 },
          opacity: { duration: 0.15 }
        }}
      >
        {/* Enhanced perfume bottle cursor with smooth morphing */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            animate={isClicking ? { scale: 0.7 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 15 }}
          >
            {/* Bottle body with morphing effect */}
            <motion.path 
              d="M8 8C8 6.89543 8.89543 6 10 6H14C15.1046 6 16 6.89543 16 8V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8Z" 
              fill="#c59dff"
              animate={isOnClickable ? { 
                fill: "#ff57a8",
                scale: 1.1,
                filter: "drop-shadow(0 0 10px rgba(255, 87, 168, 0.7))"
              } : { 
                fill: "#c59dff",
                scale: 1,
                filter: "drop-shadow(0 0 5px rgba(197, 157, 255, 0.5))"
              }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Bottle neck with glow */}
            <motion.path 
              d="M10.5 3H13.5C13.7761 3 14 3.22386 14 3.5V6H10V3.5C10 3.22386 10.2239 3 10.5 3Z" 
              fill="#c59dff"
              animate={isOnClickable ? { fill: "#ff57a8" } : { fill: "#c59dff" }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Cap with enhanced glow */}
            <motion.rect 
              x="9.5" 
              y="2" 
              width="5" 
              height="2" 
              rx="1" 
              fill="#c59dff"
              animate={isOnClickable ? { 
                fill: "#ff57a8",
                y: 1.5,
                filter: "drop-shadow(0 0 8px rgba(255, 87, 168, 0.8))"
              } : { 
                fill: "#c59dff",
                y: 2,
                filter: "drop-shadow(0 0 4px rgba(197, 157, 255, 0.6))"
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.g>
          
          {/* Enhanced animated perfume mist with particles */}
          <motion.g>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={12 + Math.sin(i * 0.5) * 3}
                cy={-2 - i * 2}
                r={1.2 - i * 0.2}
                fill="#c59dff"
                fillOpacity={0.6 - i * 0.1}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  y: [-5, -15, -25],
                  x: [0, Math.sin(i) * 3, 0],
                  scale: [0.5, 1, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + i * 0.3,
                  ease: "easeOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
      
      {/* Enhanced click ripple effect with multiple layers */}
      {isClicking && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border border-perfume-pink/30"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              initial={{ 
                width: 5 + i * 3, 
                height: 5 + i * 3,
                opacity: 0.9 - i * 0.2,
                translateX: "-50%",
                translateY: "-50%"
              }}
              animate={{ 
                width: 80 + i * 20, 
                height: 80 + i * 20,
                opacity: 0,
                translateX: "-50%",
                translateY: "-50%"
              }}
              transition={{
                duration: 0.8 + i * 0.2,
                ease: "easeOut",
                delay: i * 0.1
              }}
            />
          ))}
        </>
      )}
    </>
  );
};

export default CustomCursor;
