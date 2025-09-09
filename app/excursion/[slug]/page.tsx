// import BackButton from "@/app/components/GoBack";
// import SwiperComponent from "@/app/components/SwiperComponent";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import React from "react";

// async function getExcursionData(slug: string) {
//   const query = `*[_type == "excursions" && slug.current == "${slug}"][0]{
//   bannerImage,
//   excursionName,
//   coverImage,
//   description,
//   images

//   }`;
//   // const data = await client.fetch(query);
//   const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
//   return data;
// }

// export default async function RoomDetails({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;

//   const excursionData = await getExcursionData(slug);

//   return (
//     <div className=''>
//       <div className='h-auto md:h-[60vh] w-full overflow-hidden mb-6'>
//         {excursionData.bannerImage && (
//           <Image
//             src={urlFor(excursionData.bannerImage)}
//             width={1000}
//             height={600}
//             alt='banner image'
//             className='w-full h-auto object-cover'
//           />
//         )}
//       </div>
//       <div className=' ps-8 md:ps-24 mb-12'>
//         <BackButton />
//       </div>
//       <div className='w-full md:w-[80vw]  mx-auto pb-24'>
//         <div className='mb-6 md:mb-8'>
//           <h6 className='text-2xl md:text-5xl font-bold text-center text-[#897172] dark:text-[#B6A999]'>
//             {excursionData.excursionName && excursionData.excursionName}
//           </h6>
//         </div>
//         <div>
//           {excursionData.images && (
//             <SwiperComponent imageData={excursionData} />
//           )}
//         </div>
//         {excursionData.description && (
//           <div className=' text-[#897172] dark:text-[#B6A999] px-8 md:px-24'>
//             {excursionData.description}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// app/excursion/[slug]/page.tsx

import BackButton from "@/app/components/GoBack";
import SwiperComponent from "@/app/components/SwiperComponent";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

// Optional, but recommended: set ISR revalidation at page level
export const revalidate = 60;

// Fetch excursion data from Sanity with revalidation
async function getExcursionData(slug: string) {
  const query = `*[_type == "excursions" && slug.current == $slug][0]{
    bannerImage,
    excursionName,
    coverImage,
    description,
    images
  }`;

  // Use query params to safely inject slug
  return await client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

// Main page component
export default async function ExcursionDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const excursionData = await getExcursionData(slug);

  return (
    <div className=''>
      <div className='h-auto md:h-[90vh] w-full overflow-hidden mb-6'>
        {excursionData?.bannerImage && (
          <Image
            src={urlFor(excursionData.bannerImage)}
            width={1000}
            height={600}
            alt='banner image'
            className='w-full h-auto object-cover'
          />
        )}
      </div>

      <div className='ps-8 md:ps-24 mb-12'>
        <BackButton />
      </div>

      <div className='w-full md:w-[80vw] mx-auto pb-24'>
        <div className='mb-6 md:mb-8'>
          <h6 className='text-2xl md:text-5xl font-bold text-center text-[#897172] dark:text-gray-300'>
            {excursionData?.excursionName}
          </h6>
        </div>

        {excursionData?.images && <SwiperComponent imageData={excursionData} />}

        {excursionData?.description && (
          <div className='text-[#897172] dark:text-gray-300 px-8 md:px-24'>
            {excursionData.description}
          </div>
        )}
      </div>
    </div>
  );
}
