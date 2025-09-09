import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export const revalidate = 60;

async function getAccomodationData() {
  const query = `*[_type == "accommodation"]{
  coverImage,
  title,
  bedType,
  occupancy,
  slug
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Accommodation() {
  const accommodationData = await getAccomodationData();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
      {accommodationData &&
        accommodationData.map((room: any, index: number) => (
          <div key={index} className=' relative '>
            <div className=''>
              {room.coverImage && (
                <Image
                  src={urlFor(room.coverImage)}
                  width={200}
                  height={200}
                  alt='Image'
                  className='w-full aspect-[4/3] object-cover rounded'
                />
              )}
            </div>
            <div className='bg-black/30 w-full h-full absolute left-0 top-0 rounded'></div>
            <div className=' absolute left-1/2 bottom-6  w-full -translate-x-1/2 p-1 md:p-2 '>
              {room.title && (
                <h2 className='text-xl lg:text-2xl font-semibold text-white text-center mb-12'>
                  {room.title}
                </h2>
              )}
              <div className='px-6'>
                <div className='flex justify-between text-white font-bold mb-6'>
                  {room.bedType && (
                    <h6 className='text-xs md:text-sm'>
                      {" "}
                      <span className='text-xs md:text-sm text-orange-200'>
                        Beds /
                      </span>{" "}
                      {room.bedType}
                    </h6>
                  )}
                  {room.occupancy && (
                    <h6 className='text-xs md:text-sm'>
                      <span className='text-xs md:text-sm text-orange-200'>
                        Occupancy /
                      </span>{" "}
                      {room.occupancy} Persons
                    </h6>
                  )}
                </div>
                {room.slug && (
                  <Link
                    href={`/room/${room.slug.current}`}
                    className='px-4 py-1 bg-[#897172]/70 dark:bg-[#897172]/60 flex items-center justify-center gap-2 w-32 text-white text-xs md:text-sm mt-6 cursor-pointer hover:bg-[#897172] dark:hover:bg-[#897172]'>
                    Learn More <FaArrowRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
