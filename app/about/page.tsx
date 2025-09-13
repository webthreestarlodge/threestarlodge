import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import Motion from "../components/Motion";

export const revalidate = 60;

async function getBannerImage() {
  const query = `*[_type == "bannerImages" && imageId == 3] | order(_createdAt asc)[0]{
  image
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getAboutusData() {
  const query = `*[_type == "aboutus"]{
  mainImage,
  description,
  team[]
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Aboutus() {
  const bannerImage = await getBannerImage();
  const aboutus = await getAboutusData();

  return (
    <div className='pb-24'>
      <div className='h-full md:h-[90vh] w-full overflow-hidden mb-6 md:mb-8'>
        {bannerImage?.image && (
          <Image
            src={urlFor(bannerImage.image)}
            width={1200}
            height={600}
            alt='banner image'
            className='w-full h-auto aspect-[4/3] md:aspect-[16/9] object-cover'
          />
        )}
      </div>
      <Motion>
        <div className='w-full md:w-[85vw] mx-auto'>
          <h1 className='text-2xl md:text-6xl text-[#897172] dark:text-white font-semibold text-center mb-6 md:mb-12 uppercase'>
            About us
          </h1>
          <section className='px-8 md:px-24 flex flex-col md:flex-row gap-4'>
            <div className='flex-1 order-1 md:order-2'>
              {aboutus[0]?.mainImage && (
                <Image
                  src={urlFor(aboutus[0].mainImage)}
                  width={600}
                  height={400}
                  alt='Main Image'
                  className='w-full'
                />
              )}
            </div>
            <div className='flex-1 order-2 md:order-1 prose text-[#897172] dark:text-white mt-4 md:mt-0'>
              <PortableText value={aboutus[0]?.description} />
            </div>
          </section>
          <div className='w-full md:w-[80vw] mx-auto px-8 md:px-24 mt-12 md:mt-24'>
            <h3 className='text-xl md:text-3xl text-[#897172] dark:text-white text-center mb-4'>
              Meet Our Team
            </h3>
            <div className='flex flex-row gap-6 flex-wrap justify-center'>
              {aboutus[0].team.map((staff: any, index: number) => (
                <div key={index}>
                  <Image
                    src={urlFor(staff.memberImage)}
                    width={100}
                    height={100}
                    alt='Image'
                  />
                  <h6 className='text-sm md:text-base text-center text-[#897172] dark:text-white mt-4'>
                    {staff.name}
                  </h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Motion>
    </div>
  );
}
