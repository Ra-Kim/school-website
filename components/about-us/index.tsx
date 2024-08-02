import { playfair, schoolData } from "@/lib/constants";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const About = () => {
  return (
    <div className="bg-muted mt-16" id="about-us">
      <div className="w-[93%] lg:grid lg:grid-cols-2 flex flex-col sm:h-fit mx-auto lg:mx-0">
        <div className="relative min-h-[350px]">
          <Image src={`/assets/jpgs/about-ssis.jpg`} alt="alt" fill />
        </div>
        <div className="lg:pl-8 py-8 text-sharon">
          <div className="h-[7px] w-[69px] bg-accent"></div>
          <p className={`${playfair.className} text-5xl font-semibold mb-4`}>
            About Us
          </p>
          <p className="text-base md:text-lg text-justify">
            At {schoolData.shortName}, {schoolData.about}
          </p>
          <div className="mt-8 opacity-50">
            <Button className="w-[200px] h-[48px]">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
