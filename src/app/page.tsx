"use client";
import { Pickaxe } from "lucide-react";
import { inconsolata, karla } from "./fonts/font";
import { useRef, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import github from "../public/github.svg";
import { fetchMergedPrCount } from "@/lib/utils";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Cover } from "@/components/ui/cover";
import { motion } from "framer-motion";
import { container, item, xContent } from "@/lib/contants";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { GitHubUser } from "@/interface/github-user";
import { DEFAULT_DELAY } from "@/constants/constants";
export default function Home() {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState<GitHubUser | null>(null);
  const [mergedPrCount, setMergedPrCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!cardRef.current) return;

    try {
      await document.fonts.ready;

      htmlToImage
        .toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: window.devicePixelRatio || 1,
        })
        .then((dataUrl) => {
          download(dataUrl, "codeprofile-card.png");
        });
    } catch (err) {
      console.error("Failed to download the image", err);
    }
  };

  const fetchGitHubUserDetails = async (accessToken: string) => {
    setLoading(true);
    setTimeout(async () => {
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setUserDetails(response.data);
      const mergedPRs = await fetchMergedPrCount(
        response.data.login,
        session?.user.accessToken as string
      );
      setMergedPrCount(mergedPRs);
      setLoading(false);
    }, DEFAULT_DELAY);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="bg-[#FCFCFC] w-full min-h-[90vh] flex flex-col items-center justify-center py-20"
    >
      <motion.div
        variants={item}
        className={`${karla.className} relative md:text-8xl text-6xl font-extrabold mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]`}
      >
        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-blue-600 via-cyan-500 to-blue-300 [text-shadow:0_0_rgba(0,0,0,0.1)]">
          <span className="">codeprofile.</span>
        </div>
        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-300 py-4">
          <span className="">codeprofile.</span>
        </div>
      </motion.div>
      <div className="pb-5">
        <motion.h6
          variants={item}
          className={`${inconsolata.className} text-neutral-500 md:max-w-lg max-w-xs md:px-0 px-5 mx-auto my-2 text-sm text-center`}
        >
          Impress your developer friends (or at least your cat) with a{" "}
          <Cover>GitHub profile card</Cover>. It’s shiny, it’s cool, and it
          makes you look 10% smarter.*
        </motion.h6>
        <p className="text-xs text-gray-400 text-center">
          *Not scientifically proven, but we believe in you.
        </p>
      </div>

      {userDetails === null && session?.user ? (
        <motion.button
          variants={item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            fetchGitHubUserDetails(session?.user.accessToken as string)
          }
          className={`${karla.className} bg-blue-600 rounded-lg hover:shadow-2xl w-fit text-white px-4 py-2 flex items-center mt-6`}
        >
          {loading ? "Summoning profile..." : "Generate my awesomeness"}

          <motion.div
            className="w-4 h-4 ml-2 flex items-center justify-center"
            animate={loading ? { rotate: [0, 30, -30, 0], y: [0, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Pickaxe />
          </motion.div>
        </motion.button>
      ) : (
        userDetails === null && (
          <motion.button
            variants={item}
            onClick={() => signIn("github")}
            className={`${karla.className} bg-blue-600 border rounded-lg w-fit hover:bg-blue-700 text-neutral-800 px-4 py-2 flex items-center mt-6 shadow-2xl`}
          >
            Log in with GitHub
            <Image className="w-4 h-4 ml-2" src={github} alt="github-icon" />
          </motion.button>
        )
      )}

      {userDetails !== null && (
        <ProfileCard
          userData={userDetails}
          mergedPrCount={mergedPrCount}
          cardRef={cardRef}
        />
      )}
      {userDetails !== null && (
        <div className="flex items-center py-8">
          <button
            onClick={downloadImage}
            className="px-4 py-2 mx-3 md:block hidden rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            Download (Frame it?)
          </button>
          <button
            onClick={() =>
              toast.error(
                "Oops! Downloads don’t work on mobile. Try again on a real computer. 😅"
              )
            }
            className="px-4 py-2 mx-3 md:hidden block rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            Download (Nope.)
          </button>
        </div>
      )}
    </motion.div>
  );
}
