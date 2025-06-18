"use client";
import React, { useState } from "react";

import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { ThemeToggler } from "@/components/ui/ThemeToggler";

const navLinks = [
  {
    name: "Home",
    url: "/",
  },

  {
    name: "Rooms",
    url: "/room",
  },
  {
    name: "Excursions",
    url: "/excursion",
  },

  {
    name: "About us",
    url: "/about",
  },
];

const containerVars = {
  initial: {
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.09,
    },
  },
  open: {
    transition: {
      staggerDirection: 1,
      staggerChildren: 0.09,
      delayChildren: 0.02,
    },
  },
};

const linkVars = {
  initial: {
    y: "30vh",
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.12, 0, 0.39, 1] as [number, number, number, number],
      duration: 1,
    },
  },
};

const menuVars = {
  initial: {
    x: 500,
    opacity: 0,
    scaleY: 0,
    scaleX: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
  },
  exit: {
    x: 500,
    opacity: 0,
    scaleY: 0,
    scaleX: 0,
    transition: { delay: 0.5, duration: 0.5 },
  },
};

export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   const updateScrollPosition = () => {
  //     setScrollPosition(window.scrollY);
  //   };

  //   window.addEventListener("scroll", updateScrollPosition);

  //   updateScrollPosition();

  //   return () => window.removeEventListener("scroll", updateScrollPosition);
  // }, []);

  return (
    <>
      {!path.startsWith("/admin") ? (
        <nav
          className={`duration-500 px-2 py-2 md:py-3 md:px-10 
           flex justify-between items-center fixed w-screen z-50 bg-[#574142]/60 dark:bg-black `}>
          <div className='flex justify-between w-screen md:w-48 items-center'>
            <div className='flex justify-center items-center'>
              <Link
                href={"/"}
                className='text-xl flex justify-center items-center'>
                <Image
                  src={"/logo/logo.jpg"}
                  alt='Hevana Maldives Logo'
                  width={60}
                  height={60}
                  className='w-[45px] md:w-[75px]'
                />
              </Link>
            </div>
            <div className='block md:hidden'>
              <ThemeToggler />
            </div>
            {isOpen ? (
              <MdClose
                onClick={() => setIsOpen(false)}
                size={32}
                className='block md:hidden text-white dark:text-gray-400'
              />
            ) : (
              <GiHamburgerMenu
                onClick={() => setIsOpen(true)}
                size={32}
                className='block md:hidden text-white dark:text-gray-400 '
              />
            )}
          </div>

          {/* Desktop Navbar */}

          <div className='hidden md:block px-8 py-2 rounded w-full'>
            <ul className=' hidden md:flex md:justify-end md:gap-6 items-center '>
              {navLinks.map((navItem, index) => {
                return (
                  <li className='mx-4' key={index}>
                    <Link
                      href={navItem.url}
                      className={`text-primary ${navItem.url === path ? "md:text-[#574142]" : "md:text-white"} dark:text-gray-100 sm:font-semibold md:font-bold relative tracking-wider md:text-sm lg:text-base z-50 px-4 py-1`}>
                      {navItem.url === path && (
                        <motion.span
                          layoutId='underline'
                          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-white/50  block h-full w-full rounded  -z-40'></motion.span>
                      )}
                      {navItem.name}
                    </Link>
                  </li>
                );
              })}
              <div className='w-10 flex flex-col justify-center items-center'>
                <ThemeToggler />
              </div>
            </ul>
          </div>

          {/* Mobile Navbar */}

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVars}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{
                  duration: 0.5,
                  ease: [0.12, 0, 0.39, 0],
                }}
                className='block md:hidden absolute inset-0 h-screen bg-cover w-screen bg-[#897172] dark:bg-black pt-8 pb-10 z-50'
                style={{ backgroundImage: `url(/images/bg-mobile.jpg)` }}>
                <motion.div
                  variants={containerVars}
                  initial='initial'
                  animate='open'
                  exit='initial'>
                  <div
                    className='flex justify-end pe-4'
                    onClick={() => setIsOpen(false)}>
                    <MdClose size={32} className='text-white' />
                  </div>
                  {navLinks.map((navItem, index) => {
                    return (
                      <div key={index} className='overflow-hidden pt-12'>
                        <motion.div
                          variants={linkVars}
                          className='mx-4 py-4 text-center'
                          key={index}>
                          <Link
                            onClick={() => setIsOpen(false)}
                            href={navItem.url}
                            className='text-2xl text-white [text-shadow:_4px_1px_2px_rgb(0_0_0_/_30%)]'>
                            {navItem.name}
                          </Link>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
                <div className='flex justify-center gap-6 w-screen mt-8'>
                  <Link onClick={() => setIsOpen(false)} href={""}>
                    <AiFillFacebook size={40} className='text-white' />
                  </Link>
                  <Link onClick={() => setIsOpen(false)} href={""}>
                    <AiFillInstagram size={40} className='text-white' />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}
