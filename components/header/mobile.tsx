"use client";
import React, { useState, useEffect } from "react";
import { motion, useCycle, AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { resultChecker } from "@/lib/constants";

const MobileHeader = () => {
  const [mobileNav, toggleMobileNav] = useCycle(false, true);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const about = document.getElementById("about-us");
    const events = document.getElementById("events");
    const mission = document.getElementById("mission");
    const contact = document.getElementById("contact");

    const handleClick = () => {
      if (!page) return;
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
    toggleMobileNav();
  }, [page, toggleMobileNav]);

  return (
    <div className="lg:hidden bg-muted w-full shadow-[0px_2px_20px_0px_#0000000D] h-[100px] flex justify-between items-center pr-4">
      <Link href={`/`}>
        <Image
          src={`/assets/logo.png`}
          height={80}
          width={80}
          alt="logo"
          className="ml-4"
        />
      </Link>
      <motion.button
        animate={mobileNav ? "open" : "closed"}
        onClick={() => toggleMobileNav()}
        className={`flex flex-col lg:hidden 
         space-y-[5px] p-2 ${"absolute"} z-40 rounded-[4px] right-2`}
      >
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 7 },
          }}
          className="w-6 h-[2px] bg-black block rounded-full"
        ></motion.span>
        <motion.span
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          className="w-6 h-[2px] bg-black block rounded-full"
        ></motion.span>
        <motion.span
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -6 },
          }}
          className="w-6 h-[2px] bg-black block rounded-full"
        ></motion.span>
      </motion.button>
      <AnimatePresence>
        {mobileNav && (
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0,
            }}
          >
            <motion.div
              variants={{
                open: {
                  x: "35%",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    when: "beforeChildren",
                  },
                },
                closed: {
                  x: "200%",
                  transition: {
                    type: "spring",
                    bounce: 0.25,
                    when: "afterChildren",
                  },
                },
              }}
              animate="open"
              initial="closed"
              exit="closed"
              className={`fixed z-30 inset-0 w-[90%] text-center bg-[#fafafa] overflow-scroll text-[18px] no-scrollbar`}
            >
              <motion.div className=" mt-20">
                <div className="flex flex-col items-start m-auto gap-6 pl-4 text-sm">
                  <div>Home</div>
                  <div onClick={() => setPage(1)}>About Us</div>
                  <div onClick={() => setPage(2)}>Events</div>
                  <div onClick={() => setPage(3)}>Mission</div>
                  <Link href={resultChecker} target="blank">Result Checker</Link>
                  <div onClick={() => setPage(4)}>Contact Us</div>
                </div>
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeader;
