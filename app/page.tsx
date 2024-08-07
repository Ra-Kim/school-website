import About from "@/components/about-us";
import Classes from "@/components/classes";
import Contact from "@/components/contact";
import Events from "@/components/events";
import Footer from "@/components/footer";
import Header from "@/components/header";
import MobileHeader from "@/components/header/mobile";
import Hero from "@/components/hero";
import Mission from "@/components/mission";
import Image from "next/image";


export default function Home() {
  return (
    <div className="no-scrollbar relative scroll-smooth">
      <Header />
      <MobileHeader />
      <Hero />
      <Classes />
      <About />
      <Mission />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}
