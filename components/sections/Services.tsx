"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Brain, Globe, ArrowUpRight } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Desarrollo de Software",
    description:
      "Creamos soluciones a medida que impulsan tu negocio. Desde apps web y mobile hasta APIs e integraciones complejas.",
    items: ["Apps web y mobile", "Sistemas a medida", "APIs e integraciones", "Automatizacion de procesos"],
    accent: "cyan",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description:
      "Implementamos IA que genera resultados reales. Automatiza, predice y optimiza con tecnologia de vanguardia.",
    items: ["Chatbots inteligentes", "Modelos predictivos", "Procesamiento de datos", "Automatizacion con IA"],
    accent: "violet",
    gridClass: "md:col-span-1 md:row-span-2",
  },
  {
    icon: Globe,
    title: "Soluciones Digitales",
    description:
      "Acompanamos tu transformacion digital de punta a punta. Estrategia, tecnologia e implementacion.",
    items: ["Consultoria tecnologica", "Transformacion digital", "Optimizacion de procesos", "Infraestructura cloud"],
    accent: "pink",
    gridClass: "md:col-span-3",
  },
];

const accentStyles = {
  cyan: {
    border: "border-cyan/10 hover:border-cyan/30",
    icon: "text-cyan",
    iconBg: "bg-cyan/10",
    dot: "bg-cyan/40",
    glow: "group-hover:shadow-[0_0_40px_rgba(0,212,255,0.08)]",
    line: "bg-cyan/20",
  },
  violet: {
    border: "border-violet/10 hover:border-violet/30",
    icon: "text-violet",
    iconBg: "bg-violet/10",
    dot: "bg-violet/40",
    glow: "group-hover:shadow-[0_0_40px_rgba(123,47,255,0.08)]",
    line: "bg-violet/20",
  },
  pink: {
    border: "border-pink/10 hover:border-pink/30",
    icon: "text-pink",
    iconBg: "bg-pink/10",
    dot: "bg-pink/40",
    glow: "group-hover:shadow-[0_0_40px_rgba(255,45,205,0.08)]",
    line: "bg-pink/20",
  },
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cards = cardsRef.current?.querySelectorAll(".service-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  // Card tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent, cardEl: HTMLElement) => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardEl, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (cardEl: HTMLElement) => {
    gsap.to(cardEl, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <SplitText
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            type="words"
            stagger={0.06}
          >
            Nuestros servicios
          </SplitText>
          <div className="mt-4 flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-cyan to-transparent" />
            <p className="text-white/40 text-sm">
              Soluciones integrales para cada etapa de tu transformacion digital.
            </p>
          </div>
        </div>

        {/* Bento grid - asymmetric */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-4 md:gap-5"
          style={isMobile ? undefined : { perspective: "1200px" }}
        >
          {services.map((service, i) => {
            const styles = accentStyles[service.accent as keyof typeof accentStyles];
            const Icon = service.icon;
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={service.title}
                className={`service-card group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border ${styles.border} ${styles.glow} transition-all duration-500 ${service.gridClass}`}
                style={isMobile ? undefined : { willChange: "transform", transformStyle: "preserve-3d" }}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => {
                  handleMouseLeave(e.currentTarget);
                  setHoveredIndex(null);
                }}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                {/* Corner accent line */}
                <div className={`absolute top-0 left-8 w-12 h-px ${styles.line} transition-all duration-500 ${isHovered ? "w-24" : ""}`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`w-11 h-11 rounded-xl ${styles.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={styles.icon} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className={`text-white/10 transition-all duration-300 ${
                      isHovered ? "text-white/40 translate-x-0.5 -translate-y-0.5" : ""
                    }`}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/50">
                      <span className={`w-1 h-1 rounded-full ${styles.dot} shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
