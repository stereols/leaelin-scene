import React, { useState, useEffect } from 'react';
import { SLIDE_IMAGES, SLIDE_DURATION_MS, FADE_DURATION_CLASS } from '../constants';

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Start the slideshow timer
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDE_IMAGES.length);
    }, SLIDE_DURATION_MS);

    // Initial load effect
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {SLIDE_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`
            absolute inset-0 w-full h-full 
            transition-opacity ease-in-out ${FADE_DURATION_CLASS}
            ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
        >
          {/* 
            Background Image layer 
            We use object-cover to ensure it fills the 7-inch kiosk screen (landscape) perfectly.
          */}
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover pointer-events-none select-none"
            loading="eager"
          />
          
          {/* Optional: Subtle Overlay Gradient for better text readability if needed later */}
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        </div>
      ))}

      {/* 
        Loading State / Initial Fade In 
        This covers the screen briefly while React mounts to ensure a smooth start.
      */}
      <div 
        className={`
          absolute inset-0 bg-black z-50 pointer-events-none transition-opacity duration-1000
          ${isLoaded ? 'opacity-0' : 'opacity-100'}
        `}
      />
    </div>
  );
};

export default Slideshow;