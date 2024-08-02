"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { playfair, resultChecker, schoolData } from "@/lib/constants";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Hero = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className=" bg-secondary">
      <div className="lg:w-[86%] w-[93%] border-x border-x-[#9F9F9F] mx-auto pt-10 pb-2 text-sharon">
        <p
          className={`lg:text-7xl text-5xl md:text-6xl font-[500] text-center mt-5  md:leading-[76px]`}
        >
          <span className={playfair.className}>
            Welcome to {schoolData.name}
          </span>
        </p>
        <p className="text-xl text-center mt-6">{schoolData.motto}</p>
        <p className="text-xs text-center">{schoolData.address}</p>
        <div className="flex flex-col md:flex-row mt-10 w-fit mx-auto mb-4 gap-4">
          <Button className="w-[190px]">
            <Link href={resultChecker} target="blank">
              Result Checker
            </Link>
          </Button>
          <Link href={`/#about-us`}>
            <Button variant={`outline`} className="w-[192px]">
              Learn more about us
            </Button>
          </Link>
        </div>
        <div className="lg:h-[569px] h-[479px] w-full relative hidden md:block z-10">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="opacity 2000 ease-in"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="lg:min-h-[569px] lg:*:min-h-[569px]"
          >
            <div className="px-28 py-8 w-full h-[inherit]">
              <div className="h-[500px] max-w-full relative">
                <Image src={`/assets/jpgs/carousel-ssis.jpg`} alt="" fill />
              </div>
            </div>
            <div className="px-28 py-8 w-full h-[inherit]">
              <div className="h-[500px] max-w-full relative">
                <Image src={`/assets/jpgs/about-ssis.jpg`} alt="" fill />
              </div>
            </div>
          </Carousel>
          {/* <Image
          src={`/assets/jpgs/carousel-ssis.jpg`}
            alt="carousel"
            fill
          /> */}
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
