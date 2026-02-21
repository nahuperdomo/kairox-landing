"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;

    if (isMobile) {
      // Simple fade-in on mobile instead of per-word scrub
      gsap.fromTo(
        el,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    } else {
      const words = el.querySelectorAll(".reveal-word");
      gsap.set(words, { color: "#8888aa" });
      gsap.to(words, {
        color: "#ffffff",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  const wordElements = children.split(" ").map((word, i) => (
    <span key={i} className="reveal-word transition-colors" style={{ willChange: "color" }}>
      {word}{" "}
    </span>
  ));

  return (
    <p ref={containerRef} className={className}>
      {wordElements}
    </p>
  );
}
