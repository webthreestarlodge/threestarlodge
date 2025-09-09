import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "./components/HeroSection";
import Accommodation from "./components/Accommodation";
import Excursions from "./components/Excursions";
import Accordions from "./components/Accordions";
import IslandEssentials from "./components/IslandEssentials";
import WhatsAppWidget from "./components/WhatsAppWidget";

export const revalidate = 60;

async function getHeroData() {
  const query = `*[_type == "hero"]{
  image,
  title
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function accordionsData() {
  const query = `*[_type == "accordions"] | order(id asc){
  id,
  question,
  answer
  
  }`;
  // const accordionData = await client.fetch(query);
  const accordionData = await client.fetch(
    query,
    {},
    { next: { revalidate: 60 } }
  );
  return accordionData;
}

async function getAvailabilityData() {
  const query = `*[_type == "availability"]{
  availableRooms
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Home() {
  const heroData = await getHeroData();
  const accordionData = await accordionsData();
  const availabilityData = await getAvailabilityData();

  return (
    <div className=' w-full relative '>
      {availabilityData && (
        <div className='fixed top-16 md:top-28 right-0 z-50 bg-[#574142]/60 dark:bg-white/10  py-1 md:py-2 px-4 md:px-6'>
          <h6 className='text-white text-xs'>
            <div>
              {availabilityData[0].availableRooms > 0 ? (
                <span className='text-white dark:text-gray-300 font-bold'>
                  {availabilityData[0].availableRooms} Room(s) Available
                </span>
              ) : (
                <span className='text-white dark:text-gray-300 font-bold'>
                  No Rooms Available
                </span>
              )}
            </div>
          </h6>
        </div>
      )}

      <HeroSection data={heroData} />

      <div className='w-full md:w-[80vw] mx-auto'>
        <div className='px-4 md:px-12 py-8 md:my-12 '>
          <h1 className='text-2xl md:text-6xl text-[#897172] dark:text-gray-300 font-semibold text-center mb-4 md:mb-8 uppercase'>
            Rooms
          </h1>
          <Accommodation />
        </div>
        <hr className='h-0.5 border-t-0 bg-[#B6A999]/40 dark:bg-[#B6A999]/30' />
        <div className='px-4 md:px-12  py-12 md:my-12 '>
          <h1 className='text-[#897172] dark:text-gray-300 text-2xl md:text-6xl pb-8 md:pb-8 text-center font-semibold uppercase'>
            Excursions
          </h1>
          <Excursions />
        </div>
        <hr className='h-0.5 border-t-0 bg-[#B6A999]/40 dark:bg-[#B6A999]/30' />
        <div className='px-4 md:px-12 py-12 md:py-24'>
          <IslandEssentials />
        </div>
        <hr className='h-0.5 border-t-0 bg-[#B6A999]/40 dark:bg-[#B6A999]/30' />

        <div className='w-[90vw] mx-auto py-12'>
          <Accordions data={accordionData} />
        </div>
        <div>
          <WhatsAppWidget />
        </div>
      </div>
    </div>
  );
}
