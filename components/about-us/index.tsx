import { playfair, schoolData } from "@/lib/constants";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const About = () => {
  return (
    <div className="bg-muted mt-16">
      <div className="w-[93%] lg:grid lg:grid-cols-2 flex flex-col sm:h-fit mx-auto lg:mx-0">
        <div className="relative min-h-[350px]">
          <Image
            src={`https://s3-alpha-sig.figma.com/img/aec1/f30b/cadc22980d5076ff8ffa222ddc1181d9?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X55czDlX1tTRNGqWhiilHx5Vy6H~uYbnnoyfSEfraKOBKzykkZBpKBM7959fAmM04GwQLTSoCimOTNs48QzB3iWCPjYxWNtIz3IACLcbzpoyVwqUvCAEcsQ-seyn-pvmNy8BODMPcj0i-9N6Kxmy06IwQ12u~cQuLnKRs4ZHNiEzO5nWJmvmTuVZAWQWtYViN556upj5Lk7QdgcDl3j6jM3Wf1oz3uen~2hGdGQAP5SscvoSaIItTcWeRR6AXpeenJErAeL6Rm2lCp8aR6I-U3GlXxF8IjuphlrtEabCMG0NDhjVQejAddjFZKxmBwxA-ni9gUvqmCpXw3DjXuUgxQ__`}
            alt="alt"
            fill
          />
        </div>
        <div className="lg:pl-8 py-8 text-sharon">
          <div className="h-[7px] w-[69px] bg-accent"></div>
          <p className={`${playfair.className} text-5xl font-semibold mb-4`}>
            About Us
          </p>
          <p className="text-base md:text-lg text-justify">
            At {schoolData.shortName}, {schoolData.about}
          </p>
          <div className="mt-8">
            <Button className="w-[200px] h-[48px]">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
