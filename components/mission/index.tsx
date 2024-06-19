import Image from "next/image";
import { playfair, schoolData } from "@/lib/constants";
import React from "react";
import { ArrowRight } from "lucide-react";

const Mission = () => {
  return (
    <div className="w-[86%] mx-auto my-8">
      <p
        className={`${playfair.className} text-5xl text-sharon font-[500] w-[60%]`}
      >
        Prioritising excellence, self-actualization and high moral stanadrds
      </p>
      <div className="mt-8 grid grid-cols-2 gap-8">
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
    <div className="h-[529px] p-8 pt-24  flex flex-col gap-4 bg-muted rounded-2xl text-justify">
      <Image src={`/assets/svgs/book-rose.svg`} alt="" height={32} width={32} />
      <p className="text-2xl font-medium mt-4">{title}</p>
      <p className="w-[85%] text-lg">{details}</p>

      <div className="mt-16 flex text-primary font-medium text-xl items-center gap-2">
        <p>Read More</p>
        <ArrowRight />
      </div>
    </div>
  );
};
