import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CodingProfiles from "@/components/CodingProfiles";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Background from "@/components/Background";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CodingProfiles />
        <Achievements />
        <Contact />
        <Resume />
      </main>
      <Footer />
    </>
  );
}
