"use client";
import { BookCopy, Cake, Flame, GitMerge, MapPin } from "lucide-react";
import { RefObject, useEffect, useState } from "react";
import ContributionGraph from "./ContributionGraph";
import { fetchMostUsedLanguages, getGitAge, getGitStreak } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { FaXTwitter } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { toast } from "sonner";
import CardSkelton from "./CardSkelton";
import { karla } from "@/app/fonts/font";
import { motion } from "framer-motion";
import { item } from "@/lib/contants";
import Image from "next/image";
import { GitHubUser } from "@/interface/github-user";
interface ProfileCardProps {
  userData: GitHubUser;
  mergedPrCount: number;
  cardRef: RefObject<HTMLDivElement>;
}

export default function ProfileCard({
  userData,
  mergedPrCount,
  cardRef,
}: ProfileCardProps) {
  const [gitAge, setGitAge] = useState<number>(0);
  const [gitStreak, setGitStreak] = useState<number | undefined>(0);
  const [topLanguages, setTopLanguages] = useState<
    [string, { size: number; color: string }][] | undefined
  >([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const getRemainingDetails = async () => {
      try {
        setLoading(true);
        const streak = await getGitStreak(
          userData.login,
          session?.user.accessToken as string
        );
        setGitStreak(streak);
        setGitAge(getGitAge(userData.created_at));
        const languages = await fetchMostUsedLanguages(
          userData.login,
          session?.user.accessToken as string
        );

        setTopLanguages(languages);
      } catch (err) {
        const error = err as Error;
        console.log("error in getting remaining details :", error.message);
        toast.error("Error Generating Card");
      } finally {
        setLoading(false);
      }
    };

    getRemainingDetails();
  }, [session, userData]);

  return (
    <>
      {loading ? (
        <CardSkelton />
      ) : (
        <motion.div
          ref={cardRef}
          variants={item}
          className={`${karla.className} relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-neutral-100 md:p-10 py-10 px-5`}
        >
          <div className="flex md:flex-row flex-col items-center justify-between">
            <div className="flex justify-between items-center md:w-1/2 w-full md:justify-start">
              <Image
                width={96}
                height={96}
                className="w-24 h-24 rounded-full"
                src={userData.avatar_url}
                alt="GitHub Avatar"
                priority
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">
                  {userData.name ? userData.name : userData.login}
                </h2>
                <p className="text-gray-500">@{userData.login}</p>
                {userData.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-600 mr-1" />
                    <p className="text-gray-600">{userData.location}</p>
                  </div>
                )}
              </div>
              <div
                className={`${karla.className} relative  text-2xl -rotate-90 font-extrabold mx-auto md:hidden inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))] `}
              >
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                  <span className="">codeprofile.</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <span className="">codeprofile.</span>
                </div>
              </div>
            </div>
            <div className="flex items-center md:w-1/2 w-full md:justify-start justify-center md:mt-0 mt-6">
              <p className="text-gray-700 flex flex-col items-center">
                {userData.followers}
                <span className="font-semibold">Followers</span>
              </p>
              <p className="text-gray-700 flex flex-col items-center ml-10">
                {userData.following}
                <span className="font-semibold">Following</span>
              </p>
            </div>
            <div
              className={`${karla.className} relative md:text-xl text-3xl -rotate-90 font-extrabold mx-auto md:inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))] hidden`}
            >
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">codeprofile.</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">codeprofile.</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:flex md:flex-wrap grid grid-cols-2 gap-5 items-center md:justify-between">
            <div className="text-gray-700 md:w-fit w-full p-5 rounded-lg bg-white flex flex-col items-center justify-center shadow-sm">
              <span className="flex items-center">
                <BookCopy className="w-4 h-4 mr-1 text-blue-600" />
                {userData.public_repos}
              </span>
              <span className="font-semibold">Public Repos</span>
            </div>
            <div className="text-gray-700 md:w-fit w-full p-5 rounded-lg bg-white flex flex-col items-center justify-center shadow-sm">
              <span className="flex items-center">
                <Flame className="w-4 h-4 mr-1 text-orange-600" />
                {gitStreak} days
              </span>
              <span className="font-semibold">Git Streak</span>
            </div>
            <div className="text-gray-700 md:w-fit w-full p-5 rounded-lg bg-white flex flex-col items-center justify-center shadow-sm">
              <span className="flex items-center">
                <Cake className="w-4 h-4 mr-1 text-green-600" />
                {gitAge} years
              </span>
              <span className="font-semibold">Git Era</span>
            </div>
            <div className="text-gray-700 md:w-fit w-full p-5 rounded-lg bg-white flex flex-col items-center justify-center shadow-sm">
              <span className="flex items-center">
                <GitMerge className="w-4 h-4 mr-1 text-purple-600" />
                {mergedPrCount}
              </span>
              <span className="font-semibold">PRs Merged</span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start mt-3">
            <p className="font-semibold py-2">Top used Languages</p>
            <div className="flex items-center flex-wrap">
              {topLanguages?.slice(0, 5)?.map((lang, i) => (
                <p key={i} className="mx-2 flex items-center">
                  <GoDotFill
                    className={`w-4 h-4`}
                    style={{ color: `${lang[1].color}` }}
                  />
                  {lang[0]}
                </p>
              ))}
            </div>
          </div>
          {userData.twitter_username !== null && (
            <div className="w-full flex flex-col justify-start mt-3">
              <p className="font-semibold py-2">Else where</p>
              <p className="flex items-center p-1 text-xs border w-fit rounded-lg">
                <FaXTwitter className="w-4 h-4 mr-1" />{" "}
                {userData?.twitter_username}
              </p>
            </div>
          )}
          <div className="w-full flex flex-col items-start mt-4">
            <p className="font-semibold py-2">Contribution Graph</p>
            <ContributionGraph username={userData.login} />
          </div>
        </motion.div>
      )}
    </>
  );
}
