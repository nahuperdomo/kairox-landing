"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { href: "#about", label: "Nosotros" },
  { href: "#services", label: "Servicios" },
  { href: "#process", label: "Proceso" },
  { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current || !linksRef.current) return;
    const links = linksRef.current.querySelectorAll(".mobile-link");

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        duration: 0.8,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a12]/80 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="text-xl font-bold tracking-tight relative group">
            <span className="text-cyan">Kairox</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-white/60 hover:text-white transition-colors duration-300 py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan to-violet group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
            <MagneticButton
              href="#contact"
              className="text-sm px-5 py-2 rounded-full bg-cyan/10 text-cyan border border-cyan/20 hover:bg-cyan/20 transition-all duration-300 inline-block"
              strength={0.2}
            >
              Hablemos
            </MagneticButton>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden relative z-[60] w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[55] bg-[#0a0a12] flex items-center justify-center md:hidden"
        style={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      >
        <div ref={linksRef} className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-link text-3xl font-semibold text-white/80 hover:text-cyan transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-link mt-4 text-lg px-8 py-3 rounded-full bg-cyan text-[#0a0a12] font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Hablemos
          </a>
        </div>
      </div>
    </>
  );
}
