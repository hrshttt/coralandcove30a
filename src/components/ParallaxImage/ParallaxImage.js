"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxImage({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  speed = 0.2, // Adjusts how fast it scrolls relative to the page
  priority = false,
  sizes = "100vw",
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
      style={{ overflow: 'hidden', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <motion.div
        style={{ 
          y,
          scale: 1.2,
          transformOrigin: 'center center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={className}
          style={{ objectFit: 'cover' }}
          {...props}
        />
      </motion.div>
    </div>
  );
}
