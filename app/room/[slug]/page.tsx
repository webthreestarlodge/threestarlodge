import SwiperComponent from "@/app/components/SwiperComponent";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaUmbrellaBeach, FaWifi } from "react-icons/fa6";
import { MdCoffeeMaker } from "react-icons/md";
import { RiSailboatFill } from "react-icons/ri";

async function getAccomodationData(slug: string) {
  const query = `*[_type == "accommodation" && slug.current == "${slug}"][0]{
  bannerImage,
  title,
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

  const accommodationData = await getAccomodationData(slug);

  return (
    <div className="bg-[url('/images/flower-bg-o.png')]  bg-center">
      <div className='h-auto md:h-80 w-full overflow-hidden mb-6'>
        {accommodationData.bannerImage && (
          <Image
            src={urlFor(accommodationData.bannerImage)}
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
      <div className='mb-6'>
        <h6 className='text-5xl font-bold text-center text-[#897172] dark:text-[#B6A999]'>
          {accommodationData.title && accommodationData.title}
        </h6>
      </div>
      <div>
        {accommodationData.images && (
          <SwiperComponent imageData={accommodationData} />
        )}
      </div>
      <div className='p-12 h-screen w-full md:w-[80vw] mx-auto'>
        <div className='flex flex-col gap-6 justify-center items-center'>
          <h6 className='text-2xl font-bold text-[#897172] dark:text-[#B6A999]'>
            Most popular facilities
          </h6>
          <div className='flex gap-12 text-[#897172] dark:text-[#B6A999]'>
            <div className='flex flex-col gap-1 items-center'>
              <RiSailboatFill className='text-2xl' />
              <h6 className='text-xs md:text-sm'>Airport Transfer</h6>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <FaWifi className='text-2xl' />
              <h6 className='text-xs md:text-sm'>Free WiFi</h6>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <MdCoffeeMaker className='text-2xl' />
              <h6 className='text-xs md:text-sm'>Tea/coffee maker</h6>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <FaUmbrellaBeach className='text-2xl' />
              <h6 className='text-xs md:text-sm'>Beach</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
