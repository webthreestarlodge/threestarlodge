"use client";
import { PortableText } from "@portabletext/react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";

export default function Accordions({ data }: any) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  function toggleAccordion(id: number) {
    setOpenAccordion((prevOpen) => (prevOpen === id ? null : id));
  }

  return (
    <div className='pb-10 pt-6  '>
      <div className='mx-auto'>
        <h5 className='text-[#897172] dark:text-gray-300 text-3xl md:text-7xl font-extrabold text-center mb-4'>
          FAQ
        </h5>
        {data &&
          data.map((item: any) => (
            <div key={item.id} className='pb-2 pt-1'>
              <button
                onClick={() => toggleAccordion(item.id)}
                className='text-sm md:text-base text-white dark:text-gray-200 px-4 md:px-12 py-3 font-semibold bg-[#897172]/70 dark:bg-white/10 w-full text-start rounded-md cursor-pointer'>
                {item.question} {item.name}
              </button>
              <Collapse isOpened={openAccordion === item.id}>
                <div className='text-sm md:text-base prose dark:prose-invert text-[#805456] dark:text-gray-300 custom-prose text-justify px-4 md:px-12 bg-[#897172]/20 dark:bg-white/5 py-4 rounded-b-md'>
                  {item.answer && <PortableText value={item.answer} />}
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
}
