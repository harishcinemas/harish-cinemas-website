import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isHidden, setIsHidden] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const requestRef = useRef<number | null>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  
  const currentDotX = useRef(0);
  const currentDotY = useRef(0);
  
  const currentRingX = useRef(0);
  const currentRingY = useRef(0);

  useEffect(() => {
    // Detect mobile touch devices immediately to disable custom cursor layout elegantly
    const checkTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      setIsHidden(false);
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const onMouseEnterWindow = () => setIsHidden(false);
    const onMouseLeaveWindow = () => setIsHidden(true);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnterWindow);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Dynamic delegation to track hovering over interactive nodes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer, .hover-card-glow, .hover-primary-glow");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Ultra smooth and instantly responsive updates via requestAnimationFrame
    const updateCursor = () => {
      // For dot: quick, sharp following
      currentDotX.current += (targetX.current - currentDotX.current) * 0.45;
      currentDotY.current += (targetY.current - currentDotY.current) * 0.45;
      
      // For ring: elastic following with pleasant easing lag
      currentRingX.current += (targetX.current - currentRingX.current) * 0.18;
      currentRingY.current += (targetY.current - currentRingY.current) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentDotX.current}px, ${currentDotY.current}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.6 : isHovered ? 1.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentRingX.current}px, ${currentRingY.current}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isClicking, isHovered]);

  // Gracefully fall back on touch displays or when cursor leaves viewport
  if (isTouchDevice || isHidden) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Central Sharp Indigo Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 transition-[background-color,box-shadow] duration-200"
        style={{
          backgroundColor: "var(--indigo-400)",
          boxShadow: isHovered ? "0 0 10px var(--custom-glow)" : "none",
        }}
      />

      {/* Cinematic Glowing Outer Spring Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40 transition-[width,height,background-color,border,box-shadow,opacity] duration-300 ease-out"
        style={{
          width: isHovered ? "56px" : "28px",
          height: isHovered ? "56px" : "28px",
          border: isHovered 
            ? "1.5px solid var(--indigo-400)" 
            : "1px solid var(--indigo-300)",
          opacity: isHovered ? 1 : 0.45,
          backgroundColor: isHovered 
            ? "var(--custom-glow)" 
            : "transparent",
          boxShadow: isHovered 
            ? "0 0 25px var(--custom-glow)" 
            : "none",
        }}
      />
    </div>
  );
}
