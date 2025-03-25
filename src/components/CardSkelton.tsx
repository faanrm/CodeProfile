"use client"
import { item } from "@/lib/contants";
import {motion} from "framer-motion"

export default function CardSkelton() {
  return (
    <motion.div variants={item} className="relative md:w-[840px] w-[360px] rounded-xl bg-neutral-100 p-10">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-24 w-24"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="space-y-2 flex justify-between w-full">
          <div className="w-full mt-8 md:flex md:flex-wrap grid grid-cols-2 gap-5 md:justify-between items-center">
            <div className="h-24 w-28 bg-gray-300 rounded"></div>
            <div className="h-24 w-28 bg-gray-300 rounded"></div>
            <div className="h-24 w-28 bg-gray-300 rounded"></div>
            <div className="h-24 w-28 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="space-y-2 flex justify-between w-full">
          <div className="w-full mt-8 flex flex-col items-start">
            <div className="h-4 bg-gray-300 rounded w-3/6 my-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="space-y-2 flex justify-between w-full">
          <div className="w-full mt-8 flex flex-col items-start">
            <div className="h-4 bg-gray-300 rounded w-3/6 my-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="space-y-2 flex justify-between w-full">
          <div className="w-full mt-8 flex flex-col items-start">
            <div className="h-28 bg-gray-300 rounded w-full my-2"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
