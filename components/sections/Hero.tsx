"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import ParticleGrid from "@/components/canvas/ParticleGrid";
import ParallaxElement from "@/components/ui/ParallaxElement";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Title reveal: letter by letter with stagger
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const chars = title.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { y: 80, opacity: 0, rotateX: 60 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.04,
        delay: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  // Typewriter effect for slogan
  useEffect(() => {
    const text = "La tecnologia correcta, en el momento correcto.";
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= text.length) {
          setTypedText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 40);
      return () => clearInterval(interval);
    }, 1600);

    return () => clearTimeout(delay);
  }, []);

  // Animate CTAs and subtitle
  useEffect(() => {
    gsap.fromTo(
      ".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, delay: 2.2, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 3, ease: "power2.out" }
    );
  }, []);

  const titleText = "Somos Kairox.";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 overflow-hidden"
    >
      {/* Particle grid background */}
      <ParticleGrid />

      {/* Gradient orbs */}
      <ParallaxElement speed={0.3} className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-cyan/[0.04] rounded-full blur-[150px] pointer-events-none">
        <div />
      </ParallaxElement>
      <ParallaxElement speed={-0.2} className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-violet/[0.04] rounded-full blur-[150px] pointer-events-none">
        <div />
      </ParallaxElement>

      {/* Content - asymmetric layout */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          {/* Typewriter slogan */}
          <div className="mb-6 h-6">
            <span className="text-cyan text-sm tracking-[0.3em] uppercase font-mono">
              {typedText}
              {showCursor && (
                <span className="inline-block w-px h-4 bg-cyan ml-0.5 animate-pulse" />
              )}
            </span>
          </div>

          {/* Main title - letter reveal */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.95]"
            style={{ perspective: "600px" }}
          >
            {titleText.split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span
                  className={`hero-char inline-block ${
                    char === "K" || char === "a" || char === "i" || char === "r" || char === "o" || char === "x" || char === "."
                      ? i >= titleText.indexOf("K", 6)
                        ? "text-gradient"
                        : ""
                      : ""
                  }`}
                  style={{ willChange: "transform, opacity" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg sm:text-xl text-white/50 max-w-lg mb-10 leading-relaxed opacity-0">
            Software, inteligencia artificial y soluciones digitales para llevar tu
            negocio al siguiente nivel.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton
              href="#contact"
              className="hero-cta px-8 py-4 rounded-full bg-cyan text-[#0a0a12] font-semibold text-sm hover:bg-cyan/90 transition-all duration-200 glow-cyan inline-block text-center opacity-0"
              strength={0.3}
            >
              Hablemos
            </MagneticButton>
            <MagneticButton
              href="#services"
              className="hero-cta px-8 py-4 rounded-full border border-white/10 text-white/70 font-medium text-sm hover:border-white/25 hover:text-white transition-all duration-200 inline-block text-center opacity-0"
              strength={0.2}
            >
              Conoce nuestros servicios
            </MagneticButton>
          </div>
        </div>

        {/* Right side decorative element */}
        <div className="hidden md:flex md:col-span-4 items-center justify-center">
          <ParallaxElement speed={-0.15} className="relative">
            <div className="w-48 h-48 lg:w-64 lg:h-64 relative">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border border-cyan/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-violet/10 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-pink/5 animate-[spin_25s_linear_infinite]" />
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_20px_rgba(0,212,255,0.5)]" />
              </div>
              {/* Orbit dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet/40" />
              <div className="absolute bottom-4 right-0 w-1 h-1 rounded-full bg-pink/30" />
              <div className="absolute top-1/3 left-0 w-1 h-1 rounded-full bg-cyan/30" />
            </div>
          </ParallaxElement>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-cyan/50 to-transparent animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
