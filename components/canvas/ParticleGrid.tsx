"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 60 : 40;
    const particles: Particle[] = [];

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        particles.push({
          originX: x,
          originY: y,
          x,
          y,
          vx: 0,
          vy: 0,
        });
      }
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles(canvas);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const isMobile = window.innerWidth < 768;
    const repelRadius = isMobile ? 60 : 100;
    const repelStrength = isMobile ? 2 : 4;
    const returnSpeed = 0.06;
    const friction = 0.85;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius && !isMobile) {
          const force = (repelRadius - dist) / repelRadius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * repelStrength;
          p.vy -= Math.sin(angle) * force * repelStrength;
        }

        // Return to origin
        p.vx += (p.originX / dpr - p.x) * returnSpeed;
        p.vy += (p.originY / dpr - p.y) * returnSpeed;

        // Friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Calculate opacity based on distance from origin
        const offsetDist = Math.sqrt(
          (p.x - p.originX / dpr) ** 2 + (p.y - p.originY / dpr) ** 2
        );
        const opacity = Math.min(0.15 + offsetDist * 0.008, 0.6);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.fill();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}
