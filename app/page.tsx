import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "./components/HeroSection";
import Accommodation from "./components/Accommodation";
import Excursions from "./components/Excursions";
import Accordions from "./components/Accordions";
import IslandEssentials from "./components/IslandEssentials";

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

export default async function Home() {
  const heroData = await getHeroData();
  const accordionData = await accordionsData();

  return (
    <div className=' w-full'>
      <HeroSection data={heroData} />

      <div className='px-4 md:px-12 py-24 md:my-12 '>
        <h1 className='text-3xl md:text-7xl text-[#897172] dark:text-[#B6A999] font-extrabold text-center mb-8 md:mb-12 '>
          Rooms
        </h1>
        <Accommodation />
      </div>
      <hr className='h-0.5 border-t-0 bg-[#B6A999]/40 dark:bg-[#B6A999]/30' />
      <div className='px-4 md:px-12  py-12 md:my-12 '>
        <h1 className='text-[#897172] dark:text-[#B6A999] text-3xl md:text-7xl pb-8 md:pb-12 text-center font-extrabold'>
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
        <script src='https://elfsightcdn.com/platform.js' async></script>
        <div
          className='elfsight-app-9da51557-5826-4e97-a58e-a6d69b501ad1'
          data-elfsight-app-lazy></div>
      </div>
    </div>
  );
}
