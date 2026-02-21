"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const text = "SOFTWARE \u00B7 INTELIGENCIA ARTIFICIAL \u00B7 SOLUCIONES DIGITALES \u00B7 KAIROX \u00B7 ";

export default function ScrollMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!container || !track1 || !track2) return;

    let scrollVelocity = 0;
    let currentX1 = 0;
    let currentX2 = 0;
    const baseSpeed = 0.3;

    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        scrollVelocity = self.getVelocity() / 1000;
      },
    });

    const animate = () => {
      const speed = baseSpeed + Math.abs(scrollVelocity) * 0.05;
      const direction = scrollVelocity >= 0 ? -1 : 1;

      currentX1 += speed * direction * -1;
      currentX2 += speed * direction;

      // Reset using pixel-based translate for consistent speed
      const track1Width = track1.scrollWidth / 2;
      const track2Width = track2.scrollWidth / 2;

      if (Math.abs(currentX1) >= track1Width) currentX1 = 0;
      if (Math.abs(currentX2) >= track2Width) currentX2 = 0;

      gsap.set(track1, { x: currentX1 });
      gsap.set(track2, { x: currentX2 });

      scrollVelocity *= 0.95;
      requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  const repeatedText = text.repeat(6);

  return (
    <div
      ref={containerRef}
      className="py-16 overflow-hidden select-none pointer-events-none"
    >
      <div className="space-y-4">
        <div className="flex whitespace-nowrap">
          <div
            ref={track1Ref}
            className="flex text-5xl sm:text-6xl md:text-7xl font-bold text-white/[0.04] tracking-tight"
            style={{ willChange: "transform" }}
          >
            <span>{repeatedText}</span>
            <span>{repeatedText}</span>
          </div>
        </div>
        <div className="flex whitespace-nowrap">
          <div
            ref={track2Ref}
            className="flex text-5xl sm:text-6xl md:text-7xl font-bold text-white/[0.03] tracking-tight"
            style={{ willChange: "transform" }}
          >
            <span>{repeatedText}</span>
            <span>{repeatedText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
