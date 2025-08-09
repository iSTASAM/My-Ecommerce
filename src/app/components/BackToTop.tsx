'use client';

import { useState, useEffect } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (typeof window !== 'undefined' && window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener (only on client side)
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Don't render anything until component is mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed 
            bottom-4 right-4 
            sm:bottom-6 sm:right-6 
            md:bottom-8 md:right-8 
            lg:bottom-10 lg:right-10
            z-50
            bg-blue-600 
            hover:bg-blue-700 
            active:bg-blue-800
            text-white 
            rounded-full 
            shadow-lg 
            hover:shadow-xl 
            transition-all 
            duration-300 
            ease-in-out
            transform 
            hover:scale-110 
            active:scale-95
            focus:outline-none 
            focus:ring-4 
            focus:ring-blue-300
            w-10 h-10
            sm:w-12 sm:h-12
            md:w-14 md:h-14
            flex 
            items-center 
            justify-center
            animate-bounce
            hover:animate-none
          `}
          aria-label="กลับไปด้านบน"
          title="กลับไปด้านบน"
        >
          <MdKeyboardArrowUp 
            className="
              w-5 h-5 
              sm:w-6 sm:h-6 
              md:w-7 md:h-7
              transition-transform 
              duration-200
            " 
          />
        </button>
      )}
    </>
  );
};

export default BackToTop;
