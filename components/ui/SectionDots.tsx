"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Nosotros" },
  { id: "services", label: "Servicios" },
  { id: "process", label: "Proceso" },
  { id: "stats", label: "Datos" },
  { id: "contact", label: "Contacto" },
];

export default function SectionDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group relative flex items-center justify-end"
          aria-label={label}
        >
          <span className="absolute right-5 px-2 py-1 text-[10px] text-white/60 bg-surface/90 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id
                ? "w-2.5 h-2.5 bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.5)]"
                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        </a>
      ))}
    </div>
  );
}
