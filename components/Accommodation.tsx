import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getAccomodationData() {
  const query = `*[_type == "accommodation"]`;
  const data = await client.fetch(query);
  return data;
}

export default async function Accommodation() {
  const accommodationData = await getAccomodationData();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
      {accommodationData.map((room: any, index: number) => (
        <div key={index} className=' relative '>
          <div className=''>
            <Image
              src={urlFor(room.coverImage)}
              width={200}
              height={200}
              alt='Image'
              className='w-full aspect-[4/3] object-cover rounded'
            />
          </div>
          <div className='bg-black/30 w-full h-full absolute left-0 top-0 rounded'></div>
          <div className=' absolute left-1/2 bottom-6  w-full -translate-x-1/2 p-2 '>
            <h2 className='text-2xl font-bold text-white text-center mb-4'>
              {room.title}
            </h2>
            <div className='px-6'>
              <div className='flex justify-between text-white font-bold'>
                <h6 className='text-sm'>
                  {" "}
                  <span className='text-sm text-orange-200'>Beds /</span>{" "}
                  {room.bedType}
                </h6>
                <h6 className='text-sm'>
                  <span className='text-sm text-orange-200'>Occupancy /</span>{" "}
                  {room.occupancy} Persons
                </h6>
              </div>
              <Link
                href={`/room/${room.slug}`}
                className='px-4 py-1 bg-[#897172] text-white text-sm mt-6 cursor-pointer hover:bg-[#4D2629]'>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
