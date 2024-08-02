import Image from "next/image";
import { playfair, schoolData } from "@/lib/constants";
import React from "react";
import { ArrowRight } from "lucide-react";

const Mission = () => {
  return (
    <div className="lg:w-[86%] w-[93%] mx-auto my-8" id="mission">
      <p
        className={`${playfair.className} md:text-5xl text-2xl text-sharon font-[500] md:w-[80%] lg:w-[60%]`}
      >
        Prioritising excellence, self-actualization and high moral stanadrds
      </p>
      <div className="mt-8 grid  md:grid-cols-2 lg:gap-8 gap-4">
        {schoolData.cards.map((card, idx) => (
          <Card key={idx} title={card.title} details={card.details} />
        ))}
      </div>
    </div>
  );
};

export default Mission;

const Card = ({ title, details }: (typeof schoolData.cards)[0]) => {
  return (
    <div className="h-fit p-8 lg:pt-24 lg:flex flex-col grid gap-4 bg-muted rounded-2xl text-justify">
      <Image src={`/assets/svgs/book-rose.svg`} alt="" height={32} width={32} />
      <p className="text-2xl font-medium mt-4">{title}</p>
      <p className="w-[85%] lg:text-lg">{`At ${schoolData.shortName}, ${details}`}</p>

      <div className="mt-auto flex text-primary font-medium  lg:text-xl items-center gap-2 opacity-50">
        <p>Read More</p>
        <ArrowRight />
      </div>
    </div>
  );
};
