"use client";
import React from "react";
import { motion, useCycle, AnimatePresence, MotionConfig } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MobileHeader = () => {
  const [mobileNav, toggleMobileNav] = useCycle(false, true);

  return (
    <div className="lg:hidden bg-muted w-full relative shadow-[0px_2px_20px_0px_#0000000D] h-[100px] flex justify-between items-center pr-4">
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
         space-y-[5px] p-2 ${
           "relative"
         } z-40 rounded-[4px] `}
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
                  x: "75%",
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
              className={`fixed z-30 inset-0 w-[60%] text-center bg-[#fafafa] overflow-scroll text-[18px] no-scrollbar`}
            >
              <motion.div className=" mt-16">
                <div className="flex flex-col items-center m-auto gap-6"></div>{" "}
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeader;
