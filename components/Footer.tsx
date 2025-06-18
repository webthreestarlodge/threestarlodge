import Link from "next/link";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

import { FaPhone } from "react-icons/fa6";
// import { IoIosMail } from "react-icons/io";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='min-h-[60vh] w-screen bg-[#574142]  dark:bg-black duration-500 dark:border-t border-white  flex flex-col justify-between py-6 text-white dark:text-gray-300'>
      <div className=' md:flex justify-between items-start px-10'>
        <div className='flex md:hidden gap-2 md:gap-4 justify-center items-center'>
          <Link href={""}>
            <AiFillFacebook size={42} color={"white"} />
          </Link>
          <Link href={""}>
            <AiFillInstagram size={42} color={"white"} />
          </Link>
        </div>
        <div className='mt-12 md:mt-0'>
          <h1 className='text-xl font-bold mb-2 md:mb-4 tracking-wider'>
            Contact us
          </h1>
          <div className='flex gap-2 items-center mb-2'>
            <FaPhone size={20} />
            <Link href={"tel:"}>
              <p className='text-xs md:text-sm'>Phone: +960</p>
            </Link>
          </div>
          {/* <div className='flex gap-2 items-center mb-2'>
            <IoIosMail size={24} />
            <Link href='mailto:'>
              <p className='text-xs md:text-sm'>
                Email: reservations@hevanamaldives.com
              </p>
            </Link>
          </div> */}
          {/* <div className='flex gap-2 items-center'>
            <FaWhatsapp size={24} />
            <Link href={"https://wa.me/"}>
              <p className='text-xs md:text-sm'>WhatsApp: +960 7722212</p>
            </Link>
          </div> */}
        </div>

        <div className='hidden md:flex gap-2 md:gap-4 justify-center items-center'>
          <Link href={""}>
            <AiFillFacebook size={42} color={"white"} />
          </Link>
          <Link href={""}>
            <AiFillInstagram size={42} color={"white"} />
          </Link>
        </div>

        <div className='mt-12 md:mt-0 mb-24 md:mb-0'>
          <h1 className='text-xl font-bold mb-2 md:mb-4 tracking-wider'>
            Address
          </h1>
          <div>
            <div className='mb-2 text-xs md:text-sm'>
              <p>Three Star Lodge</p>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center self-center'>
        <h5 className='text-xs md:text-sm'>
          Copyright © {year} Three Star Lodge
        </h5>

        <Link href={"https://www.ahmedareef.com/"}>
          <h5 className='text-xs text-gray-200 mt-2'>
            Developed by Ahmed Areef
          </h5>
        </Link>
      </div>
    </footer>
  );
}
