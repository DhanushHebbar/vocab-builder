import React, { useEffect, useRef } from 'react';

const NavWaves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100; // Height of the wave area
    };

    const drawWave = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple waves with different phases and opacities
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Wave parameters
        const amplitude = 15 - i * 3;
        const frequency = 0.02;
        const phase = time * 0.002 + i * Math.PI / 2;
        const opacity = 0.15 - i * 0.03;

        // Draw wave path
        for (let x = 0; x <= canvas.width; x += 1) {
          const y = canvas.height - 30 + 
                   Math.sin(x * frequency + phase) * amplitude +
                   Math.sin(x * frequency * 0.5 + phase * 1.5) * (amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        // Fill wave with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(79, 70, 229, ${opacity})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, ${opacity})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame((t) => drawWave(t));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawWave(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      style={{ height: '100px' }}
    />
  );
};

export default NavWaves;