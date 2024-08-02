"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContactForm from "./form";
import { playfair } from "@/lib/constants";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  const containerStyle = {
    ...(isMobile && {
      backgroundImage: "/assets/jpgs/contact-ssis.jpg",
    }),
  };
  return (
    <div className="py-12" id="contact">
     
      <div
        className="w-[86%] mx-auto shadow-[1px_6px_20px_0px_#0000001A] grid md:grid-cols-[80%_20%] text-sharon bg-black bg-cover bg-opacity-50   lg:bg-white"
        // style={{
        //   backgroundImage: isMobile ? "url(/assets/jpgs/contact-ssis.jpg)" : "",
        //   fillOpacity: 0.5,
        // }}
      >
         {isMobile && (
        <div className="h-[300px] w-[100%] relative mb-2">
          <Image
            src={`/assets/jpgs/contact-ssis.jpg`}
            alt="schoolboy"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
        <div className="p-8">
          <p
            className={`${playfair.className} text-[30px] md:text-[40px] md:w-[60%] font-medium mb-4`}
          >
            For questions or enquires, get in touch with us
          </p>
          <ContactForm />
        </div>
        <div className="bg-accent lg:flex items-center justify-end relative hidden">
          <div className="h-[75%] w-[160%] bg-blue-600 absolute">
            <Image
              src={`/assets/jpgs/contact-ssis.jpg`}
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
