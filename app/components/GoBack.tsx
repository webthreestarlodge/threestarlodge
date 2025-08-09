"use client"; // If using Next.js App Router
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation"; // App Router (Next.js 13+)
// For Pages Router, use: import { useRouter } from 'next/router';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='cursor-pointer font-bold flex items-center gap-1 text-[#897172] dark:text-[#B6A999]'>
      <FaArrowLeft />
      Go Back
    </button>
  );
}
