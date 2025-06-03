import React, { useEffect, useRef } from 'react';

interface Word {
  x: number;
  y: number;
  opacity: number;
  word: string;
  velocity: number;
}

const words = [
  'vocabulary', 'learning', 'knowledge', 'wisdom', 'education',
  'growth', 'understanding', 'mastery', 'fluency', 'eloquence',
  'literacy', 'comprehension', 'proficiency', 'expertise', 'acumen'
];

const BackgroundWords: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<Word[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initWords = () => {
      wordsRef.current = Array.from({ length: 20 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.3 + 0.1,
        word: words[Math.floor(Math.random() * words.length)],
        velocity: Math.random() * 0.5 + 0.1
      }));
    };

    const drawWords = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      wordsRef.current.forEach((wordObj) => {
        const dx = mouseRef.current.x - wordObj.x;
        const dy = mouseRef.current.y - wordObj.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Adjust opacity based on mouse proximity
        let targetOpacity = wordObj.opacity;
        if (distance < 200) {
          targetOpacity = 0.6;
        }
        
        // Move words
        wordObj.y += wordObj.velocity;
        if (wordObj.y > canvas.height) {
          wordObj.y = -20;
          wordObj.x = Math.random() * canvas.width;
        }

        ctx.font = '16px Inter';
        ctx.fillStyle = `rgba(99, 102, 241, ${targetOpacity})`;
        ctx.fillText(wordObj.word, wordObj.x, wordObj.y);
      });

      frameRef.current = requestAnimationFrame(drawWords);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    initWords();
    drawWords();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundWords;