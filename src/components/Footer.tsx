"use client";

import { karla } from "@/app/fonts/font";
import Link from "next/link";
import { motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";
import { container, item } from "@/lib/contants";

export default function Footer() {
  return (
    <motion.footer
      variants={container}
      initial="hidden"
      animate="visible"
      className={`${karla.className} bg-[#FCFCFC] fixed bottom-0 w-full h-fit py-2 text-neutral-500 border-t border-t-gray-100 shadow-md flex flex-col justify-center items-center`}
    >
      <motion.p variants={item}>
        Crafted with way too much coffee by{" "}
        <Link
          className="hover:underline px-1"
          href={"https://github.com/faanrm"}
        >
          @faanrm
        </Link>
      </motion.p>
      <motion.p variants={item} className="text-xs flex items-center py-2">
        <span>All rights reserved, but you can borrow them &copy; 2025</span>{" "}
      </motion.p>
    </motion.footer>
  );
}
