"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './TrueFocus.css';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColors?: string[]; 
  glowColors?: string[];
  wordColors?: string[]; // NUEVA PROPIEDAD: Para el color del texto
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus = ({
  sentence = 'True Focus',
  manualMode = false,
  blurAmount = 4,
  borderColors = ['#e40139', '#0069b3'], 
  glowColors = ['rgba(228, 1, 57, 0.4)', 'rgba(0, 105, 179, 0.4)'], 
  wordColors = ['#e40139', '#0069b3'], // NUEVO: Colores de las palabras (Rojo, Azul)
  animationDuration = 0.5,
  pauseBetweenAnimations = 1
}: TrueFocusProps) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const getCurrentColor = (type: 'border' | 'glow' | 'word', index: number) => {
    let colorsArray;
    if (type === 'border') colorsArray = borderColors;
    else if (type === 'glow') colorsArray = glowColors;
    else colorsArray = wordColors;
    return colorsArray[index % colorsArray.length];
  };

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();
    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        
        const currentBorderColor = getCurrentColor('border', index);
        const currentGlowColor = getCurrentColor('glow', index);
        const currentWordColor = getCurrentColor('word', index); // Capturamos el color de la palabra

        return (
          <span
            key={index}
            ref={el => { wordRefs.current[index] = el; }}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
            style={{
              filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
              '--border-color': currentBorderColor,
              '--glow-color': currentGlowColor,
              color: currentWordColor, // APLICAMOS EL COLOR AL TEXTO (Rojo para índice 0, Azul para índice 1)
              transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`
            } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}
      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{ duration: animationDuration }}
        style={{
          '--border-color': getCurrentColor('border', currentIndex),
          '--glow-color': getCurrentColor('glow', currentIndex)
        } as React.CSSProperties}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;