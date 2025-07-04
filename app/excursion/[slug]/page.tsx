import SwiperComponent from "@/app/components/SwiperComponent";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

async function getExcursionData(slug: string) {
  const query = `*[_type == "excursions" && slug.current == "${slug}"][0]{
  bannerImage,
  excursionName,
  coverImage,
  description,
  images
  
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function RoomDetails({
  params,
}: {
  params: Promise<{ slug: "string" }>;
}) {
  const { slug } = await params;

  const excursionData = await getExcursionData(slug);

  return (
    <div className="bg-[url('/images/flower-bg-o.png')]  bg-center ">
      <div className='h-auto md:h-80 w-full overflow-hidden mb-6'>
        {excursionData.bannerImage && (
          <Image
            src={urlFor(excursionData.bannerImage)}
            width={1000}
            height={600}
            alt='banner image'
            className='w-full h-auto object-cover'
          />
        )}
      </div>
      <div className=' ps-8 md:ps-24  mb-12'>
        <Link
          href={"./"}
          className='font-bold flex items-center gap-1 text-[#897172] dark:text-[#B6A999]'>
          <FaArrowLeft /> Back
        </Link>
      </div>
      <div className='w-full md:w-[80vw]  mx-auto pb-24'>
        <div className='mb-6 md:mb-8'>
          <h6 className='text-2xl md:text-5xl font-bold text-center text-[#897172] dark:text-[#B6A999]'>
            {excursionData.excursionName && excursionData.excursionName}
          </h6>
        </div>
        <div>
          {excursionData.images && (
            <SwiperComponent imageData={excursionData} />
          )}
        </div>
        {excursionData.description && (
          <div className=' text-[#897172] dark:text-[#B6A999] px-8 md:px-24'>
            {excursionData.description}
          </div>
        )}
      </div>
    </div>
  );
}
