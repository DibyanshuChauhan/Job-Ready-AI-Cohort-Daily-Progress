import { useState, useEffect } from 'react';

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isCursorVisible) setIsCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isCursorVisible]);

  useEffect(() => {
    const addHoverEvents = () => {
      const clickables = document.querySelectorAll(
        'button, a, input, label, select, textarea, [role="button"], .cursor-pointer'
      );
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHoveringClickable(true));
        el.addEventListener('mouseleave', () => setIsHoveringClickable(false));
      });
    };

    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverEvents();

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isCursorVisible) return null;

  return (
    <>
      {/* Inner cursor dot */}
      <div 
        className="fixed w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference hidden md:block"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      {/* Outer trailing circle */}
      <div 
        className={`fixed border border-white rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-difference hidden md:block ${
          isHoveringClickable ? 'w-10 h-10 bg-white/10 scale-110' : 'w-6 h-6'
        }`}
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`
        }}
      />
    </>
  );
};
export default CustomCursor;
