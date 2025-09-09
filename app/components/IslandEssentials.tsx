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
      <h3 className='text-[#897172] dark:text-gray-300 text-2xl md:text-6xl pb-6 md:pb-8 text-center font-semibold uppercase'>
        Island Essentials
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {data &&
          data.map((item: any, index: number) => (
            <div
              key={index}
              className='bg-white dark:bg-white/10 box-shadow-css rounded'>
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
                <h6 className='text-[#897172] dark:text-gray-300 text-sm md:text-xl lg:text-2xl mt-6 pb-6 md:pb-12 text-center'>
                  {item.title}
                </h6>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
