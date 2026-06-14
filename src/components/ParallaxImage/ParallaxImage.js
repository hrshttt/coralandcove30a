"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  speed = 0.2, // Adjusts how fast it scrolls relative to the page
  ...props 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scale the image slightly and move it up/down to create the parallax effect
  // We scale the image to 1.2 so that there is extra image available to scroll through
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div 
      ref={ref} 
      className={`overflow-hidden relative ${containerClassName}`}
      style={{ overflow: 'hidden' }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{ 
          y,
          scale: 1.2,
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        {...props}
      />
    </div>
  );
}
