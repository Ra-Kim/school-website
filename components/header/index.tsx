import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="lg:h-[110px] bg-[#F8FAFA] w-full relative shadow-[0px_2px_20px_0px_#0000000D]">
      <div className="w-[72%] mx-auto flex items-center justify-between h-full text-sharon ">
        <nav className="flex gap-12">
          <Link href={`/`}>Home</Link>
          <Link href={`#about-us`}>About Us</Link>
          <Link href={`#events`}>Events</Link>
        </nav>
        <Image
          src={`/assets/logo.png`}
          height={80}
          width={80}
          alt="logo"
          className="ml-4"
        />
        <nav className="flex gap-10">
          <Link href={`#mission`}>Mission</Link>
          <Link href={`/`}>Result Checker</Link>
          <Link href={`#contact`}>Contact Us</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
