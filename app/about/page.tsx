import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

async function getBannerImage() {
  const query = `*[_type == "bannerImages" && imageId == 3] | order(_createdAt asc)[0]{
  image
  }`;
  const data = await client.fetch(query);
  return data;
}

async function getAboutusData() {
  const query = `*[_type == "aboutus"]`;
  const data = await client.fetch(query);
  return data;
}

export default async function Aboutus() {
  const bannerImage = await getBannerImage();
  const aboutus = await getAboutusData();
  return (
    <div className='pb-24'>
      <div className='h-full md:h-[60vh] w-full overflow-hidden mb-8 md:mb-12'>
        {bannerImage.image && (
          <Image
            src={urlFor(bannerImage.image)}
            width={1200}
            height={600}
            alt='banner image'
            className='w-full h-auto aspect-[3/1] object-cover'
          />
        )}
      </div>
      <h1 className='text-5xl md:text-7xl text-[#897172] dark:text-[#B6A999] font-extrabold text-center mb-8 md:mb-12 '>
        About us
      </h1>
      <section className='px-4 md:px-24 flex flex-col md:flex-row gap-4'>
        <div className='flex-1 order-1 md:order-2'>
          <Image
            src={urlFor(aboutus[0].mainImage)}
            width={600}
            height={400}
            alt='Main Image'
            className='w-full'
          />
        </div>
        <div className='flex-1 order-2 md:order-1 prose text-[#897172]  dark:text-[#B6A999]'>
          <PortableText value={aboutus[0].description} />
        </div>
      </section>
    </div>
  );
}
