import { schoolData } from "@/lib/constants";
import Image from "next/image";
import React from "react";

const Classes = () => {
  return (
    <div className="py-8 bg-[#151515CC]">
      <div className="w-[86%] flex justify-between mx-auto">
        {schoolData.classes.map(({ name, description }, idx) => (
          <Class key={idx} name={name} description={description} />
        ))}
      </div>
    </div>
  );
};

export default Classes;

const Class = ({ name, description }: (typeof schoolData.classes)[0]) => {
  return (
    <div className="grid grid-cols-[20%_80%] text-white">
      <div className="flex items-center h-full">
        <Image
          src={`/assets/svgs/school_cap.svg`}
          alt=""
          height={50}
          width={50}
        />
      </div>
      <div>
        <p className="font-[500] text-xl">{name}</p>
        <p className="font-[300]">{description}</p>
      </div>
    </div>
  );
};
