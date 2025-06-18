// import SwiperComponent from "@/app/components/SwiperComponent";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

async function getAccomodationData(slug: string) {
  const query = `*[_type == "accommodation" && slug.current == "${slug}"][0]{
  bannerImage,
  title
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
        <Link href={"./"} className='font-bold flex items-center gap-1'>
          <FaArrowLeft /> Back
        </Link>
      </div>
      <div className='h-screen'>
        <h6 className='text-5xl font-bold text-center text-[#897172] dark:text-[#B6A999]'>
          {accommodationData.title}
        </h6>
      </div>
      {/* <div>
        <SwiperComponent imageData={accommodationData} />
      </div> */}
    </div>
  );
}
