import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Section Divider */}
      <div className="section-divider" />

      <About />

      <div className="section-divider" />

      <Events />

      <div className="section-divider" />

      <Gallery />

      <div className="section-divider" />

      <Team />

      <div className="section-divider" />

      <Contact />

      <Footer />
    </main>
  );
}
