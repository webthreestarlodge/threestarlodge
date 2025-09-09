"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { urlFor } from "@/sanity/lib/image";

export default function ImageGallery({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // const images = [
  //   "/images/image-1.jpg",
  //   "/images/image-1.jpg",
  //   "/images/image-1.jpg",
  // ];
  // const images = [
  //   { src: "/images/image-1.jpg", title: "School Front View" },
  //   { src: "/images/image-1.jpg", title: "Library Hallway" },
  //   { src: "/images/image-1.jpg", title: "Sports Ground" },
  // ];

  // const slides = data.map((img: any) => ({
  //   src: img.image,
  //   title: img.title,
  // }));
  const slides = data.map((item: any) => ({
    src: item.image && urlFor(item.image),
  }));

  return (
    <div className='min-h-screen px-4 py-8 sm:px-8 md:px-12 lg:px-24 '>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data?.map((img: any, index: number) => (
          <div
            key={index}
            className='cursor-pointer w-full'
            onClick={() => {
              setIndex(index);
              setOpen(true);
            }}>
            {img.image ? (
              <Image
                src={urlFor(img.image)}
                width={1000}
                height={600}
                alt={`Image ${index + 1}`}
                className='w-full aspect-[16/9] object-cover rounded-md hover:opacity-90 transition'
              />
            ) : (
              <h6>No Image</h6>
            )}
            {/* <p className='text-sm text-center mt-2 text-gray-600 dark:text-foreground'>
              {img.title}
            </p> */}
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
      />
    </div>
  );
}
