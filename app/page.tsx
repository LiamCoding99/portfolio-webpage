import HexNav from "@/components/nav/HexNav";
import Hero from "@/components/sections/Hero";
import Overview from "@/components/sections/Overview";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import SystemLog from "@/components/sections/SystemLog";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <HexNav />
      <main>
        <Hero />
        <Overview />
        <Projects />
        <Skills />
        <SystemLog />
      </main>
      <Footer />
    </>
  );
}
