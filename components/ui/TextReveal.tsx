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
