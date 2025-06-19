import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "./components/HeroSection";
import Accommodation from "./components/Accommodation";
import Excursions from "./components/Excursions";
import Accordions from "./components/Accordions";

async function getHeroData() {
  const query = `*[_type == "hero"]{
  image,
  title
  }`;
  const data = await client.fetch(query);
  return data;
}

async function accordionsData() {
  const query = `*[_type == "accordions"] | order(id asc){
  id,
  question,
  answer
  
  }`;
  const accordionData = await client.fetch(query);
  return accordionData;
}

export default async function Home() {
  const heroData = await getHeroData();
  const accordionData = await accordionsData();

  return (
    <div className=" w-full bg-[url('/images/flower-bg-o.png')] bg-center">
      <HeroSection data={heroData} />

      <div className='px-4 md:px-12 py-12 md:my-12 '>
        <Accommodation />
      </div>
      <div className='px-4 md:px-12  py-12 md:my-12 min-h-screen'>
        <Excursions />
      </div>
      <div className='w-[90vw] mx-auto'>
        <Accordions data={accordionData} />
      </div>
      {/* <div className='h-screen '></div> */}
      <div className='h-screen bg-purple-300/40'></div>
    </div>
  );
}
