import Link from "next/link";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='min-h-[60vh] w-full bg-[#574142]/90 dark:bg-black text-white dark:text-gray-200 duration-500 dark:border-t border-white  flex flex-col justify-between py-6 '>
      <div className=' md:flex justify-between items-start px-10'>
        <div className='flex md:hidden gap-2 md:gap-4 justify-center items-center'>
          <Link href={""}>
            <AiFillFacebook size={32} />
          </Link>
          <Link href={""}>
            <AiFillInstagram size={34} />
          </Link>
          <Link href={""}>
            <FaSquareXTwitter size={30} />
          </Link>
          <Link href={""}>
            <FaTripadvisor size={32} />
          </Link>
        </div>
        <div className='mt-12 md:mt-0'>
          <h1 className='text-xl font-bold mb-2 md:mb-4 tracking-wider'>
            Contact us
          </h1>
          <div className='flex gap-2 items-center mb-2'>
            <FaPhone size={20} />
            <Link href={"tel:"}>
              <p className='text-xs md:text-sm'>Phone: +393517628057</p>
            </Link>
          </div>
        </div>

        <div className='hidden md:flex gap-2 md:gap-4 justify-center items-center'>
          <Link href={""}>
            <AiFillFacebook size={42} />
          </Link>
          <Link href={""}>
            <AiFillInstagram size={44} />
          </Link>
          <Link href={""}>
            <FaSquareXTwitter size={40} />
          </Link>
          <Link href={""}>
            <FaTripadvisor size={42} />
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

        <h5 className='text-xs text-[#897172] dark:text-gray-500 mt-2'>
          Developed by Ahmed Areef
        </h5>
      </div>
    </footer>
  );
}
