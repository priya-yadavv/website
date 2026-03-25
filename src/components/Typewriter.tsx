"suse client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Typewriter({
  text,
  delay = 10,
  onComplete,
  slow = false
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
  slow?: boolean
}) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const actualDelay = slow ? delay * 2 : delay;

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, actualDelay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, actualDelay, text, onComplete]);

  return (
    <span>
      {currentText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-4 ml-1 bg-[var(--color-primary)] align-middle opacity-50"
        />
      )}
    </span>
  );
}
