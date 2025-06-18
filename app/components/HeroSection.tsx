"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { urlFor } from "@/sanity/lib/image";

export default function HeroSection({ data }: { data: any }) {
  return (
    <div className='md:h-screen overflow-hidden'>
      <div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          speed={3000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          //   breakpoints={{
          //     0: {
          //       slidesPerView: 1,
          //     },
          //     768: {
          //       slidesPerView: 3,
          //     },
          //           }}
        >
          {data.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              {
                <Image
                  src={urlFor(item.image)}
                  width={1000}
                  height={800}
                  alt={item.title}
                  className='aspect-[16/9] object-cover w-full h-[80vh] md:h-auto'
                />
              }
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
