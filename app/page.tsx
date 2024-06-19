import About from "@/components/about-us";
import Classes from "@/components/classes";
import Contact from "@/components/contact";
import Events from "@/components/events";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Mission from "@/components/mission";
import { Inter , Playfair_Display} from "next/font/google";
import Image from "next/image";


export const playfair = Playfair_Display({ subsets: ["latin"] });
export const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="no-scrollbar relative">
      <Header />
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
