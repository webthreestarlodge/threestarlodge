import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

import Accommodation from "../components/Accommodation";

async function getBannerImage() {
  const query = `*[_type == "bannerImages" && imageId == 1] | order(_createdAt asc)[0]{
  image
  }`;
  const data = await client.fetch(query);
  return data;
}
export default async function Room() {
  const bannerImage = await getBannerImage();

  return (
    <div className="pb-24 bg-[url('/images/flower-bg-o.png')]  bg-center ">
      <div className='md:h-[60vh] w-full overflow-hidden mb-12'>
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
      <div className='px-12'>
        <h1 className='text-5xl md:text-7xl text-[#897172] dark:text-[#B6A999] font-extrabold text-center mb-12 '>
          Rooms
        </h1>
        <div className='min-h-screen'>
          <Accommodation />
        </div>
      </div>
    </div>
  );
}
