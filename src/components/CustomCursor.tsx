
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

  return null; // Custom cursor disabled - using system cursor for better performance
});

export default CustomCursor;
