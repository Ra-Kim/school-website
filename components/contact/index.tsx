import React from "react";
import Image from "next/image";
import ContactForm from "./form";
import { playfair } from "@/lib/constants";

const Contact = () => {
  return (
    <div className="py-12">
      <div className="w-[86%] mx-auto shadow-[1px_6px_20px_0px_#0000001A] grid grid-cols-[80%_20%] text-sharon">
        <div className="p-8">
          <p
            className={`${playfair.className} text-[40px] w-[60%] font-medium mb-4`}
          >
            For questions or enquires, get in touch with us
          </p>
          <ContactForm />
        </div>
        <div className="bg-accent flex items-center justify-end relative">
          <div className="h-[75%] w-[160%] bg-blue-600 absolute">
            <Image
              src={`https://s3-alpha-sig.figma.com/img/aa4f/365c/d91200750efe040da259600c27ed723c?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nRKshxJqffsFHSLDczgxRxtb5zPFty80fkxssoCJhMkAsLI9QdCtZn38TxcHD9T9MNVkDvsnSEw6thqeb~yclvavCFqeXXKTtAj3D9NsJKqwvAa3czA8VHiwZ7XTrdNYzL1urIdKuBCBjiCQV8iq3AKF-gUqSfqjV3Xs5j7rLpLbKRfMsSRqxyxDC9BRJ3hMtPueDX0eoUAC2H182VOIAaMGnPifoWdIPA6oQm3nuwXpp5AVf6IWJBOgBmP9g1ijk4J-qiMfoo~kNy3DnPbpIlz7BfzgMcHXngmPdMH6w45KLuMC9yDuI1hSH-10xHFdzA0lcJ5bI9roPRE-fo6IGQ__`}
              alt="schoolboy"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="absolute h-[50px] w-[50px] bg-accent left-[-70%] top-14"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
