import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import ImageGallery from "../components/ImageGallery";

export const revalidate = 60;

async function getBannerImage() {
  const query = `*[_type == "bannerImages" && imageId == 4] | order(_createdAt asc)[0]{
  image
  }`;
  // const data = await client.fetch(query);
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getGalleryImages() {
  const query = `*[_type == "gallery"]{
    image
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const bannerImage = await getBannerImage();
  const imageData = await getGalleryImages();

  return (
    <div>
      <div className='h-full md:h-[90vh] w-full overflow-hidden mb-8 md:mb-12'>
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
      <div className='px-6 md:px-12 w-full md:w-[80vw] mx-auto'>
        <h1 className='text-2xl md:text-6xl text-[#897172] dark:text-white font-semibold text-center mb-4 md:mb-8 uppercase'>
          Gallery
        </h1>
        <div>
          <ImageGallery data={imageData} />
        </div>
      </div>
    </div>
  );
}
