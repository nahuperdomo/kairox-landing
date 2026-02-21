"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParallaxElement from "@/components/ui/ParallaxElement";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;

    if (isMobile) {
      gsap.fromTo(
        content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: content, start: "top 85%", once: true },
        }
      );
    } else {
      gsap.fromTo(
        content,
        { clipPath: "inset(0 50% 0 50%)" },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: content,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === content) t.kill();
      });
    };
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="py-32 px-6 relative">
      {/* Subtle background shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d1a] to-transparent pointer-events-none" />

      <ParallaxElement
        speed={0.3}
        className="absolute top-16 left-[15%] w-40 h-40 border border-cyan/[0.03] rounded-full pointer-events-none hidden md:block"
      >
        <div />
      </ParallaxElement>
      <ParallaxElement
        speed={-0.2}
        rotate={-10}
        className="absolute bottom-16 right-[12%] w-24 h-24 border border-violet/[0.03] rounded-3xl pointer-events-none hidden md:block"
      >
        <div />
      </ParallaxElement>

      <div ref={contentRef} className="relative max-w-4xl mx-auto text-center">
        <div className="p-12 sm:p-16 md:p-20 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/[0.03] via-transparent to-violet/[0.03]" />

          {/* Decorative background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold text-white/[0.015] leading-none">
              IA
            </span>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="text-[10px] text-cyan tracking-[0.2em] uppercase">
                Dato clave
              </span>
            </div>

            <div className="text-7xl sm:text-8xl md:text-9xl font-bold mb-6 leading-none">
              <AnimatedCounter
                target={72}
                suffix="%"
                className="text-gradient-animated"
                duration={2.5}
              />
            </div>

            <p className="text-white/50 text-lg sm:text-xl max-w-lg mx-auto mb-8 leading-relaxed">
              de las empresas que adoptan inteligencia artificial mejoran su
              eficiencia operativa en el primer ano.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all duration-300"
              data-cursor-hover
            >
              Ya estas aprovechando la IA?
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
