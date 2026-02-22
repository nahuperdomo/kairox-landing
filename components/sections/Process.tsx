"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ear, PenTool, Rocket, TrendingUp, Clock, Shield, Zap } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Ear,
    number: "01",
    title: "Escuchamos",
    description:
      "Entendemos tu negocio, tus objetivos y tus desafios. Cada proyecto comienza con una conversacion profunda para alinear expectativas.",
    color: "cyan",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Disenamos",
    description:
      "Creamos una solucion a medida con la arquitectura, tecnologia y estrategia adecuada para tu caso particular.",
    color: "violet",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Ejecutamos",
    description:
      "Desarrollamos, testeamos y entregamos. Con metodologias agiles, iteramos rapido y mantenemos calidad en cada paso.",
    color: "pink",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Mayor eficiencia",
    description: "Procesos optimizados que reducen costos y tiempos operativos.",
  },
  {
    icon: Clock,
    title: "Time to market",
    description: "Entregamos rapido sin sacrificar calidad. Tu idea al mercado antes.",
  },
  {
    icon: Shield,
    title: "Tecnologia solida",
    description: "Arquitecturas escalables y seguras que crecen con tu negocio.",
  },
  {
    icon: Zap,
    title: "Innovacion real",
    description: "IA y automatizacion aplicadas a problemas concretos de tu empresa.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const results = resultsRef.current;
    if (!section || !track || !results) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Total scroll distance: cards + results panel
      const totalWidth = track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + 400}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Scroll the track left
      tl.to(track, { x: -totalWidth, ease: "none", duration: 1 }, 0);

      // Animate cards as they enter
      const cards = track.querySelectorAll(".process-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 80%",
              end: "left 40%",
              scrub: true,
            },
          }
        );
      });

      // Animate results panel at the end
      const benefitCards = results.querySelectorAll(".benefit-card");
      const resultsTitle = results.querySelector(".results-title");

      gsap.fromTo(
        resultsTitle,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: resultsTitle,
            containerAnimation: tl,
            start: "left 85%",
            end: "left 60%",
            scrub: true,
          },
        }
      );

      benefitCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 90%",
              end: "left 60%",
              scrub: true,
            },
          }
        );
      });
    });

    // Mobile: no GSAP animations - content visible via CSS
    mm.add("(max-width: 767px)", () => {
      // Do nothing - CSS handles visibility
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-32 pb-12 md:pb-0 max-w-6xl mx-auto">
        <SplitText
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          type="words"
          stagger={0.06}
        >
          Como trabajamos
        </SplitText>
        <div className="mt-4 flex items-center gap-4">
          <div className="w-12 h-px bg-gradient-to-r from-cyan to-transparent" />
          <p className="text-white/40 text-sm">
            Un proceso simple, transparente y orientado a resultados.
          </p>
        </div>
      </div>

      {/* Step indicators - desktop */}
      <div className="hidden md:flex px-6 mt-8 mb-8 max-w-6xl mx-auto items-center gap-3">
        {steps.map((step, i) => {
          const dotColors = { cyan: "bg-cyan", violet: "bg-violet", pink: "bg-pink" };
          return (
            <div key={step.number} className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/20">{step.number}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${dotColors[step.color as keyof typeof dotColors]} opacity-40`} />
              <span className="text-xs text-white/25">{step.title}</span>
              {i < steps.length - 1 && (
                <div className="w-8 h-px bg-white/5" />
              )}
            </div>
          );
        })}
        <div className="w-8 h-px bg-white/5" />
        <span className="text-xs text-white/25">Resultados</span>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-12 pb-32 md:pb-0 md:pt-8"
        style={{ width: "fit-content" }}
      >
        {/* Left spacer */}
        <div className="hidden md:block shrink-0 w-[8vw]" />

        {steps.map((step) => {
          const Icon = step.icon;
          const colorMap = {
            cyan: { border: "border-cyan/15", accent: "text-cyan", bg: "bg-cyan/5", dot: "bg-cyan" },
            violet: { border: "border-violet/15", accent: "text-violet", bg: "bg-violet/5", dot: "bg-violet" },
            pink: { border: "border-pink/15", accent: "text-pink", bg: "bg-pink/5", dot: "bg-pink" },
          };
          const c = colorMap[step.color as keyof typeof colorMap];

          return (
            <div
              key={step.number}
              className={`process-card shrink-0 w-full md:w-[380px] p-8 rounded-2xl bg-white/[0.02] border ${c.border} transition-all duration-500`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <Icon size={22} className={c.accent} />
                </div>
                <span className={`text-xs font-mono ${c.accent} opacity-60`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/5" />
                <div className={`w-2 h-2 rounded-full ${c.dot} opacity-40`} />
              </div>

              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}

        {/* Arrow connector - desktop */}
        <div className="hidden md:flex shrink-0 items-center px-4">
          <div className="w-16 h-px bg-gradient-to-r from-pink/20 to-cyan/20 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-cyan/30 rotate-45" />
          </div>
        </div>

        {/* Results panel */}
        <div ref={resultsRef} className="shrink-0 w-full md:w-[520px] mt-8 md:mt-0">
          <div className="results-title mb-6">
            <h3 className="text-2xl font-bold mb-2">
              Resultados para tu empresa
            </h3>
            <p className="text-white/30 text-sm">
              Lo que conseguis trabajando con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="benefit-card p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan/15 transition-all duration-300 group"
                >
                  <Icon
                    size={18}
                    className="text-cyan/50 mb-3 group-hover:text-cyan transition-colors duration-300"
                  />
                  <h4 className="text-sm font-semibold mb-1.5">{benefit.title}</h4>
                  <p className="text-[13px] text-white/30 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right spacer */}
        <div className="hidden md:block shrink-0 w-[8vw]" />
      </div>
    </section>
  );
}
