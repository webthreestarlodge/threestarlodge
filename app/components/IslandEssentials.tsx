import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

export const revalidate = 60;

async function getIslandEssentialsData() {
  const query = `*[_type == "islandEssentials"]{
  title,
  image
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function IslandEssentials() {
  const data = await getIslandEssentialsData();
  return (
    <div className='w-full mx-auto'>
      <h3 className='text-[#897172] dark:text-[#B6A999] text-3xl md:text-7xl pb-8 md:pb-12 text-center font-extrabold'>
        Island Essentials
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-12'>
        {data &&
          data.map((item: any, index: number) => (
            <div
              key={index}
              className='bg-white dark:bg-white/20 box-shadow-css rounded'>
              {item.image && (
                <Image
                  src={urlFor(item.image)}
                  width={600}
                  height={400}
                  alt={item.title}
                  className='aspect-[4/3] object-cover w-full rounded-t'
                />
              )}
              {item.title && (
                <h6 className='text-[#897172] dark:text-[#B6A999] text-xl lg:text-2xl mt-6 pb-8 md:pb-12 text-center font-bold'>
                  {item.title}
                </h6>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
