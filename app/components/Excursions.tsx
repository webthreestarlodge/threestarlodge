import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export const revalidate = 60;

async function getExcursionData() {
  const query = `*[_type == "excursions"]{
  coverImage,
  slug,
  excursionName,
  description
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}
export default async function Excursions() {
  const excursionData = await getExcursionData();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
      {excursionData &&
        excursionData.map((excursion: any, index: number) => (
          <div
            key={index}
            className=' relative bg-white dark:bg-white/10  box-shadow-css h-full'>
            <div className=''>
              {excursion.coverImage && (
                <Image
                  src={urlFor(excursion.coverImage)}
                  width={200}
                  height={200}
                  alt='Image'
                  className='w-full aspect-[4/3] object-cover rounded'
                />
              )}
            </div>
            {/* <div className='bg-black/30 w-full h-full absolute left-0 top-0 rounded'></div>  */}
            <div className=' px-4 py-6 flex flex-col justify-between h-[30vh]'>
              <div>
                <h2 className='text-xl md:text-2xl font-bold  text-center mb-4 text-[#897172] dark:text-[#B6A999]'>
                  {excursion.excursionName}
                </h2>
                <h6 className='text-[#897172] dark:text-[#B6A999] line-clamp-4'>
                  {excursion.description}
                </h6>
              </div>
              <div className='md:px-6'>
                <Link
                  href={`/excursion/${excursion.slug.current}`}
                  className='px-4 py-1 bg-[#897172]/80 dark:bg-[#897172]/30 flex items-center justify-center gap-2 w-32 text-white dark:text-[#B6A999] text-xs cursor-pointer hover:bg-[#897172] dark:hover:bg-[#897172]/50 '>
                  Learn More <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
