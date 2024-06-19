import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { events, playfair } from "@/lib/constants";

const Events = () => {
  return (
    <div className="bg-secondary py-8">
      <div className="w-[93%] ml-auto grid grid-cols-[30%_70%] text-sharon">
        <div className="flex flex-col justify-center gap-6">
          <p className={`${playfair.className} text-[40px]  font-medium`}>
            Our upcoming events
          </p>
          <p className="text-lg w-[95%] leading-9">
            Our curriculum is designed to stimulate intellectual curiosity,
            encourage creativity, and develop
          </p>
          <Button className="w-[227px] h-[48px] rounded-[4px]">
            View all events
          </Button>
        </div>
        <div className="grid grid-rows-[90%_10%]">
          <div className="flex gap-8 overflow-x-scroll h-[480px] pr-8 custom-scrollbar">
            {events.map((event, idx) => (
              <EventCard
                key={idx}
                name={event.name}
                date={event.date}
                time={event.time}
                image={event.image}
              />
            ))}
          </div>
          {/* <div className="flex justify-between w-[90%] text-xl mt-4">
            <div className="h-[40px] w-[40px] rounded-full bg-primary grid place-items-center">
              <ArrowLeft color="#fff"/>
            </div>
            <div className="h-[40px] w-[40px] rounded-full bg-primary grid place-items-center">
              <ArrowRight color="#fff"/>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Events;

const EventCard = ({ name, date, time, image }: (typeof events)[0]) => {
  return (
    <div className="h-[450px] min-w-[370px] relative rounded-[10px]">
      <Image
        src={image}
        alt=""
        fill
        style={{ objectFit: "cover", borderRadius: "10px" }}
      />
      <div className="absolute bottom-0 left-0 h-[25%] bg-[#424242E5] w-full rounded-[0px_0px_10px_10px] flex justify-between p-4 text-white">
        <div className="flex flex-col gap-2">
          <p className="text-xl">{name}</p>
          <p className="font-light text-sm">{date}</p>
          <p className="font-light text-sm">{time}</p>
        </div>
        <div className="flex items-end font-medium text-sm">
          <p>View event details</p>
        </div>
      </div>
    </div>
  );
};
