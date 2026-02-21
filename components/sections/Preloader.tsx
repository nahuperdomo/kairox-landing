"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem("kairox-preloader-shown")) {
      setShow(false);
      onComplete();
      return;
    }

    const container = containerRef.current;
    const path = pathRef.current;
    const letters = lettersRef.current;
    if (!container || !path || !letters) return;

    const letterEls = letters.querySelectorAll(".preloader-letter");
    const pathLength = path.getTotalLength();

    // Set initial states
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.set(letterEls, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("kairox-preloader-shown", "true");
        gsap.to(container, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setShow(false);
            onComplete();
          },
        });
      },
    });

    // Animate K stroke drawing
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
    });

    // Fade out K
    tl.to(path, { opacity: 0.3, duration: 0.3 }, "+=0.1");

    // Reveal letters
    tl.to(
      letterEls,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // Hold
    tl.to({}, { duration: 0.4 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#0a0a12] flex items-center justify-center"
    >
      {/* SVG K */}
      <div className="relative">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          className="absolute -left-20 top-1/2 -translate-y-1/2"
        >
          <path
            ref={pathRef}
            d="M 20 15 L 20 85 M 20 50 L 60 15 M 20 50 L 60 85"
            stroke="#00d4ff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div ref={lettersRef} className="flex items-center gap-1 text-4xl sm:text-5xl font-bold tracking-tight pl-16">
          {"KAIROX".split("").map((letter, i) => (
            <span key={i} className="preloader-letter text-white">
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
