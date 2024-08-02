"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { resultChecker } from "@/lib/constants";

const Header = () => {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const about = document.getElementById("about-us");
    const events = document.getElementById("events");
    const mission = document.getElementById("mission");
    const contact = document.getElementById("contact");

    const handleClick = () => {
      if (page === 1) {
        about?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      if (page === 2) {
        events?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      if (page === 3) {
        mission?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      if (page === 4) {
        contact?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    handleClick();
  }, [page]);

  return (
    <div className="hidden lg:block lg:h-[110px] bg-muted w-full relative shadow-[0px_2px_20px_0px_#0000000D]">
      <div className="w-[72%] mx-auto flex items-center justify-between h-full text-sharon ">
        <nav className="flex gap-12 [&_div]:cursor-pointer">
          <div>Home</div>
          <div onClick={() => setPage(1)}>About Us</div>
          <div onClick={() => setPage(2)}>Events</div>
        </nav>
        <Image
          src={`/assets/logo.png`}
          height={80}
          width={80}
          alt="logo"
          className="ml-4"
        />
        <nav className="flex gap-10 [&_div]:cursor-pointer">
          <div onClick={() => setPage(3)}>Mission</div>
          <Link href={resultChecker} target="blank">Result Checker</Link>
          <div onClick={() => setPage(4)}>Contact Us</div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
