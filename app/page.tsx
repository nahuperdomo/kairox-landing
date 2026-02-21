import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Lazy load below-the-fold sections
const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Stats = dynamic(() => import("@/components/sections/Stats"));

export default function Home() {
  return (
    <>
      <SmoothScroll />
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
    </>
  );
}
