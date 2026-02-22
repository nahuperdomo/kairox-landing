"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import SplitText from "@/components/ui/SplitText";
import ParallaxElement from "@/components/ui/ParallaxElement";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  // Clip-path reveal animation - desktop only
  useEffect(() => {
    const clip = clipRef.current;
    if (!clip) return;

    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;

    // No GSAP on mobile - content visible via CSS
    if (isMobile) return;

    {
      gsap.fromTo(
        clip,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: clip,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === clip) t.kill();
      });
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative">
      {/* Section separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cyan/20 to-transparent" />

      {/* Decorative parallax elements */}
      <ParallaxElement
        speed={0.4}
        rotate={15}
        className="absolute top-20 right-[10%] w-32 h-32 border border-violet/5 rounded-2xl pointer-events-none hidden md:block"
      >
        <div />
      </ParallaxElement>
      <ParallaxElement
        speed={-0.3}
        className="absolute bottom-20 left-[8%] w-20 h-20 border border-cyan/5 rounded-full pointer-events-none hidden md:block"
      >
        <div />
      </ParallaxElement>

      <div className="max-w-5xl mx-auto">
        <div ref={clipRef} className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left - label and title */}
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet" />
              <span className="text-[10px] text-violet tracking-[0.2em] uppercase">
                Sobre nosotros
              </span>
            </div>

            <SplitText
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              type="words"
              stagger={0.06}
            >
              El momento oportuno es ahora
            </SplitText>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-cyan to-transparent" />
              <span className="text-xs text-muted font-mono">EST. 2024 — Uruguay</span>
            </div>
          </div>

          {/* Right - text content */}
          <div className="md:col-span-7 space-y-8">
            <TextReveal className="text-lg sm:text-xl leading-[1.8]">
              Kairox nace del griego Kairós (καιρός), que significa "el momento oportuno". No cualquier momento, sino el momento preciso para actuar y transformar.
            </TextReveal>

            <TextReveal className="text-lg sm:text-xl leading-[1.8]">
              Somos una empresa uruguaya especializada en software, inteligencia artificial y soluciones digitales. Llegamos en el momento justo con la solución precisa para transformar tu negocio.
            </TextReveal>

            <div className="pt-6 flex flex-wrap gap-3">
              {["Software", "IA", "Cloud", "Consultoría"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs text-white/40 border border-white/5 rounded-full hover:border-cyan/20 hover:text-cyan/60 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
