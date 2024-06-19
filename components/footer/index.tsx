import { inter } from "@/lib/constants";
import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div
      className={`${inter.className} h-[40px] w-full bg-accent flex justify-center gap-4 text-white text-sm mb-[-10%] items-center`}
    >
      <h1>Designed By Mindless Arts</h1>
      <Copyright />
      <p>Copyright 2024</p>
    </div>
  );
};

export default Footer;
