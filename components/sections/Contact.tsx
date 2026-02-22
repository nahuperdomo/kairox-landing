"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Instagram, Send, Check, Loader2 } from "lucide-react";
import GlowInput from "@/components/ui/GlowInput";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const form = formRef.current;
    const info = infoRef.current;
    if (!form || !info) return;

    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    if (isMobile) return;

    gsap.fromTo(
      form,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: form, start: "top 85%", once: true },
      }
    );

    gsap.fromTo(
      info,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: info, start: "top 85%", once: true },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === form || t.trigger === info) t.kill();
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate sending
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 relative">
      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold text-white/[0.015] leading-none tracking-tight">
          HABLEMOS
        </span>
      </div>

      {/* Section separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-16">
          <SplitText
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            type="words"
            stagger={0.06}
          >
            Tenes una idea? Hablemos.
          </SplitText>
          <div className="mt-4 flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-violet to-transparent" />
            <p className="text-white/40 text-sm">
              Contanos sobre tu proyecto y te respondemos en menos de 24 horas.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <GlowInput label="Nombre" name="name" required />
              <GlowInput label="Email" name="email" type="email" required />
            </div>

            <GlowInput
              label="Contanos sobre tu proyecto..."
              name="message"
              as="textarea"
              rows={5}
              required
            />

            <button
              type="submit"
              disabled={status !== "idle"}
              className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan text-[#0a0a12] font-semibold text-sm transition-all duration-300 glow-cyan disabled:opacity-70 overflow-hidden group"
            >
              <span
                className={`flex items-center gap-2 transition-all duration-300 ${
                  status === "idle" ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                }`}
              >
                <Send size={16} />
                Enviar mensaje
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === "loading" ? "translate-y-0 opacity-100" : status === "idle" ? "translate-y-8 opacity-0" : "-translate-y-8 opacity-0"
                }`}
              >
                <Loader2 size={16} className="animate-spin" />
                Enviando...
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === "sent" ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Check size={16} />
                Enviado!
              </span>
            </button>
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="md:col-span-2 flex flex-col justify-center gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-sm font-semibold text-white/70 mb-5">
                Contacto directo
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:contacto@kairox.tech"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-cyan transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan/5 flex items-center justify-center group-hover:bg-cyan/10 transition-colors">
                    <Mail size={16} className="text-cyan/60" />
                  </div>
                  contacto@kairox.tech
                </a>
                <a
                  href="https://instagram.com/kairox.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-violet transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet/5 flex items-center justify-center group-hover:bg-violet/10 transition-colors">
                    <Instagram size={16} className="text-violet/60" />
                  </div>
                  @kairox.tech
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan/[0.03] to-violet/[0.03] border border-white/5">
              <p className="text-sm text-white/50 leading-relaxed italic">
                &quot;La tecnologia correcta, en el momento correcto.&quot;
              </p>
              <p className="text-xs text-white/20 mt-3 font-mono">
                Kairox &mdash; Uruguay
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
