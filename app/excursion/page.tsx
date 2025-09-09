import React from "react";
import Excursions from "../components/Excursions";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

async function getBannerImage() {
  const query = `*[_type == "bannerImages" && imageId == 2] | order(_createdAt asc)[0]{
  image
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Excursion() {
  const bannerImage = await getBannerImage();
  return (
    <div className='pb-24  '>
      <div className='md:h-[60vh] w-full overflow-hidden mb-12'>
        {bannerImage?.image && (
          <Image
            src={urlFor(bannerImage.image)}
            width={1200}
            height={600}
            alt='banner image'
            className='w-full h-auto aspect-[4/3] md:aspect-[3/1] object-cover'
          />
        )}
      </div>
      <div className='px-6 md:px-12 w-full md:w-[80vw] mx-auto'>
        <h1 className='text-[#897172] dark:text-gray-300 text-2xl md:text-7xl pb-8 md:pb-12 text-center font-semibold uppercase'>
          Excursions
        </h1>
        <div>
          <Excursions />
        </div>
      </div>
    </div>
  );
}
