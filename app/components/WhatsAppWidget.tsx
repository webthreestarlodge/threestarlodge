"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSquareWhatsapp } from "react-icons/fa6";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const phoneNumber = "+393517628057"; // ← Change to your number (international format, no +)
  const message = "";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <div
        className='fixed bottom-6 right-6 z-50 cursor-pointer'
        onClick={() => setOpen(!open)}>
        <div className='text-5xl text-[#B6A999]'>
          <FaSquareWhatsapp />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: 0 }}
            className='fixed bottom-20 right-6 z-50 w-64 bg-white dark:bg-white/10 shadow-lg rounded-lg p-4 text-sm'>
            <p className='mb-2'>Chat with us on WhatsApp</p>
            <Link
              href={whatsappLink}
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full text-center bg-[#B6A999] dark:bg-white/20 text-white py-2 px-4 rounded hover:bg-[#B6A999]/80'>
              Start Chat
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
