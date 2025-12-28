import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 9000); // Balanced density
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1, // Medium particles (1-3.5px)
        speedX: (Math.random() - 0.5) * 0.9,
        speedY: (Math.random() - 0.5) * 0.9,
        opacity: Math.random() * 0.5 + 0.35, // Balanced visibility (0.35-0.85)
      }));
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction - balanced effect
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) { // Balanced interaction radius
          const force = (200 - distance) / 200;
          particle.x -= dx * force * 0.06; // Balanced push
          particle.y -= dy * force * 0.06;
          
          // Balanced glow effect near mouse
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsla(221, 83%, 53%, ${force * 0.5})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(221, 83%, 53%, ${force * 0.35})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw particle with balanced glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(221, 83%, 53%, ${particle.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(221, 83%, 53%, ${particle.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections - balanced visibility
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) { // Balanced connection distance
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const opacity = 0.35 * (1 - distance / 160); // Balanced connection opacity
            ctx.strokeStyle = `hsla(221, 83%, 53%, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }} // Added transparency
    />
  );
};