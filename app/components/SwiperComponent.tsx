"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { urlFor } from "@/sanity/lib/image";

export default function SwiperComponent({ imageData }: any) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  return (
    <div className='flex justify-center'>
      <div className='w-full md:w-[80vw] px-8 md:px-24 mb-12'>
        <Swiper
          modules={[Thumbs]}
          slidesPerView={1}
          loop
          thumbs={{ swiper: selectedImage }}>
          {imageData.images &&
            imageData.images.map((image: any, index: any) => (
              <SwiperSlide key={index}>
                <Image
                  src={urlFor(image)}
                  alt='Image'
                  width={800}
                  height={600}
                  className='w-full aspect-[16/9] object-cover origin-bottom'
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='py-2'>
          <Swiper
            modules={[Navigation, Thumbs]}
            slidesPerView={5}
            spaceBetween={10}
            navigation
            loop
            onSwiper={setSelectedImage}
            className='mySwiper'>
            {imageData.images &&
              imageData.images.map((image: any, index: any) => (
                <SwiperSlide key={index}>
                  <Image
                    src={urlFor(image)}
                    alt='Image'
                    width={100}
                    height={80}
                    className='w-full cursor-pointer aspect-[16/9] object-cover'
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
