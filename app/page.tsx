import About from "@/components/about-us";
import Classes from "@/components/classes";
import Contact from "@/components/contact";
import Events from "@/components/events";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Mission from "@/components/mission";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Classes />
      <About />
      <Mission />
      <Events />
      <Contact />
    </>
  );
}
