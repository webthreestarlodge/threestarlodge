import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "./components/HeroSection";
import Accommodation from "./components/Accommodation";
import Excursions from "./components/Excursions";

async function getHeroData() {
  const query = `*[_type == "hero"]{
  image,
  title
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const heroData = await getHeroData();

  return (
    <div className=" w-full bg-[url('/images/flower-bg-o.png')] bg-center">
      <HeroSection data={heroData} />

      <div className='px-4 md:px-12 py-12 md:my-12 '>
        <Accommodation />
      </div>
      <div className='px-4 md:px-12  py-12 md:my-12 min-h-screen'>
        <Excursions />
      </div>

      {/* <div className='h-screen '></div> */}
      <div className='h-screen bg-purple-300/40'></div>
    </div>
  );
}
