
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnClickable, setIsOnClickable] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Optimized spring configuration
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Throttled mouse position update
  const throttleRef = useRef<number>(0);
  
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - throttleRef.current < 16) return; // ~60fps throttle
    throttleRef.current = now;
    
    cursorX.set(e.clientX - 16);
    cursorY.set(e.clientY - 16);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  // Optimized hover detection with throttling
  const hoverThrottleRef = useRef<number>(0);
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - hoverThrottleRef.current < 50) return; // Throttle hover detection
    hoverThrottleRef.current = now;
    
    const target = e.target as HTMLElement;
    
    const isClickableElement = !!(
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.getAttribute('role') === 'button' ||
      target.classList.contains('clickable')
    );
    
    setIsOnClickable(isClickableElement);
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Use passive event listeners for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousemove', handleMouseOver, { passive: true });
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
  }, [updateMousePosition, handleMouseOver]);

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
          
          {/* Optimized perfume mist - reduced particles for performance */}
          <motion.g>
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={12}
                cy={-2 - i * 3}
                r={1 - i * 0.2}
                fill="#c59dff"
                fillOpacity={0.7 - i * 0.2}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  y: [-5, -20],
                  scale: [0.8, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + i * 0.2,
                  ease: "easeOut",
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
      
      {/* Optimized click ripple - single element for performance */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full border-2 border-perfume-pink/40"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%"
          }}
          initial={{ 
            width: 8, 
            height: 8,
            opacity: 0.8
          }}
          animate={{ 
            width: 60, 
            height: 60,
            opacity: 0
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        />
      )}
    </>
  );
});

export default CustomCursor;
