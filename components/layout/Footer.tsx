"use client";

import { useState } from "react";
import { Instagram, Mail } from "lucide-react";

const footerLinks = [
  { href: "#about", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#process", label: "Proceso" },
  { href: "#contact", label: "Contacto" },
];

export default function Footer() {
  const [showEaster, setShowEaster] = useState(false);

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 px-6 overflow-hidden">
      {/* Decorative big text */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none">
        <span className="text-[8rem] sm:text-[10rem] md:text-[14rem] font-bold text-white/[0.015] leading-none tracking-tighter">
          KAIROX
        </span>
      </div>

      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-cyan/40 via-violet/40 to-pink/40"
          style={{
            animation: "footerLine 6s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Logo + tagline - left aligned */}
          <div className="md:col-span-4">
            <div
              className="relative inline-block mb-3 group"
              onMouseEnter={() => setShowEaster(true)}
              onMouseLeave={() => setShowEaster(false)}
            >
              <span className="text-2xl font-bold text-cyan cursor-default">Kairox</span>

              {/* Easter egg tooltip */}
              <div
                className={`absolute -top-12 left-0 px-4 py-2 rounded-lg bg-surface border border-cyan/20 whitespace-nowrap transition-all duration-300 ${
                  showEaster
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <span className="text-xs text-white/70">
                  &#954;&#945;&#953;&#961;&#972;&#962; &mdash; el momento oportuno
                </span>
                <div className="absolute bottom-0 left-6 translate-y-1/2 rotate-45 w-2 h-2 bg-surface border-r border-b border-cyan/20" />
              </div>
            </div>

            <p className="text-xs text-white/25 max-w-xs leading-relaxed">
              Software, inteligencia artificial y soluciones digitales.
              Transformamos negocios con tecnologia de vanguardia.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-xs text-white/30 uppercase tracking-[0.2em] mb-4">
              Secciones
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300 w-fit relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan/40 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs text-white/30 uppercase tracking-[0.2em] mb-4">
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contacto@kairox.tech"
                className="flex items-center gap-2 text-sm text-white/30 hover:text-cyan transition-colors duration-300"
              >
                <Mail size={14} />
                contacto@kairox.tech
              </a>
              <a
                href="https://instagram.com/kairox.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/30 hover:text-violet transition-colors duration-300"
              >
                <Instagram size={14} />
                @kairox.tech
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/15">
            &copy; 2026 Kairox. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-white/10">
            Hecho con precision en Uruguay.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes footerLine {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(300%); }
        }
      `}</style>
    </footer>
  );
}
