"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  type?: "words" | "chars";
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: "scroll" | "mount";
  y?: number;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "div",
  type = "words",
  stagger = 0.04,
  duration = 0.8,
  delay = 0,
  trigger = "scroll",
  y = 40,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;

    const elements = el.querySelectorAll(".split-item");

    if (trigger === "scroll") {
      gsap.fromTo(
        elements,
        { y, opacity: 0, rotateX: 40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    } else {
      gsap.fromTo(
        elements,
        { y, opacity: 0, rotateX: 40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        }
      );
    }

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [trigger, stagger, duration, delay, y]);

  const items =
    type === "words"
      ? children.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="split-item inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {word}
            </span>
            {i < children.split(" ").length - 1 && "\u00A0"}
          </span>
        ))
      : children.split("").map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="split-item inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ));

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={{ perspective: "600px" }}
    >
      {items}
    </Tag>
  );
}
