"use client";

const technologies = [
  "Next.js",
  "React",
  "Python",
  "OpenAI",
  "AWS",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "TypeScript",
  "Tailwind",
  "Vercel",
  "Redis",
];

export default function TechStack() {
  const items = [...technologies, ...technologies];

  return (
    <section className="py-20 overflow-hidden relative">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="text-center mb-10">
        <span className="text-xs text-muted tracking-[0.2em] uppercase">
          Tecnologias que usamos
        </span>
      </div>

      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a12] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
          {items.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="flex-shrink-0 mx-6 px-6 py-3 rounded-full border border-white/5 text-sm text-white/20 hover:text-cyan hover:border-cyan/20 transition-all duration-300 cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
