"use client";
import React, { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

type PropType = {
  children: ReactNode;
};

export default function Motion({ children }: PropType) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <div
        ref={ref}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(100px)",
          transition: "opacity 2s, transform 2s",
        }}>
        {children}
      </div>
    </>
  );
}
