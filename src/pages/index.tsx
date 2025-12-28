import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { PerformanceShowcase } from "@/components/PerformanceShowcase";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <PerformanceShowcase />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}