"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/ui/Analytics";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="bg-grid">
        <Hero />
        <About />
        <Services />
        <Process />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </SmoothScroll>
  );
}
