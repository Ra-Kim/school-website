import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { playfair, schoolData } from "@/lib/constants";

const Hero = () => {
  return (
    <div className=" bg-secondary">
      <div className="lg:w-[86%] w-[93%] border-x border-x-[#9F9F9F] mx-auto pt-10 pb-2 text-sharon">
        <p className={`lg:text-7xl text-5xl md:text-6xl font-[500] text-center mt-5  md:leading-[76px]`}>
          <span className={playfair.className}>
            Welcome to {schoolData.name}
          </span>
        </p>
        <p className="text-xl text-center mt-6">{schoolData.motto}</p>
        <p className="text-xs text-center">{schoolData.address}</p>
        <div className="flex flex-col md:flex-row mt-10 w-fit mx-auto mb-4 gap-4">
          <Button className="w-[190px]">Result Checker</Button>
          <Button variant={`outline`} className="w-[192px]">
            Learn more about us
          </Button>
        </div>
        <div className="lg:h-[569px] h-[479px] w-full relative hidden md:block">
          <Image
            src={`https://s3-alpha-sig.figma.com/img/2dbd/00e0/12b790fbae97e5b70f07a3605082fe89?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZfF79~2Ni8bOAnt1u4oUto~3KNG-bm0LYXadPmYseGyE4hYLvoUTGW1Bbg3UFxRPNq4-apfNm4hI47neAU4AAkdvpY53PRcdWm5bmhqFs7A9Aj8WBd1F5sbZbqgSEaSWJ0K5xcUXFHGapJdGmt3jxB0cNR84mJAWcNxRddmbZ7mHaekkX~GvOSKoT5TIOPLDuyMVWQRxVgv8VmfSNi4I~5Z7raZiE~Q0N9QQ0p7BWkuCysniEnpdxvuWQ07RmpDKKicMANEhnQQ1qe6M3pTgFT2rK0RrMcdTOu886uzFARq-6IxYdT-yabZp49hyvCMPvQbvmmD-rC0WBh3dYQTr0w__`}
            alt="carousel"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

// font-family: Playfair Display;
// font-size: 72px;
// font-weight: 500;
// line-height: 95.98px;
// text-align: center;
