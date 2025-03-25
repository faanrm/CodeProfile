import React, { useState, RefObject } from "react";
import {
  BookCopy,
  Cake,
  Flame,
  GitMerge,
  MapPin,
  Rocket,
  Zap,
  Trophy,
  Microscope,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { ProfileCardProps } from "@/types/types";
import ContributionGraph from "./ContributionGraph";
import { fetchMostUsedLanguages, getGitAge, getGitStreak } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCallback } from "react";
const DEFAULT_USER = {
  login: "githubuser",
  name: "GitHub User",
  avatar_url: "/api/placeholder/96/96",
  public_repos: 0,
  followers: 0,
  following: 0,
  created_at: new Date().toISOString(),
  location: null,
  twitter_username: null,
};

export default function ProfileCardSelector({
  userData = {},
  mergedPrCount = 0,
  cardRef,
}: ProfileCardProps) {
  const completeUserData = { ...DEFAULT_USER, ...userData };
  const [cardVariant, setCardVariant] = useState("default");
  const [gitAge, setGitAge] = useState<number>(0);
  const [gitStreak, setGitStreak] = useState<number | undefined>(0);
  const [topLanguages, setTopLanguages] = useState<
    [string, { size: number; color: string }][] | undefined
  >([]);
  const { data: session } = useSession();

  const fetchRemainingDetails = useCallback(async () => {
    if (
      session?.user.accessToken &&
      completeUserData.login !== DEFAULT_USER.login
    ) {
      try {
        const streak = await getGitStreak(
          completeUserData.login,
          session.user.accessToken
        );
        setGitStreak(streak);

        setGitAge(getGitAge(completeUserData.created_at));

        const languages = await fetchMostUsedLanguages(
          completeUserData.login,
          session.user.accessToken
        );
        setTopLanguages(languages);
      } catch (err) {
        console.error("Error fetching additional details:", err);
        setGitStreak(0);
        setTopLanguages([]);
      }
    }
  }, [completeUserData.login, session?.user.accessToken]);

  useEffect(() => {
    fetchRemainingDetails();
  }, [fetchRemainingDetails]);

  const CardVariantSelector = () => (
    <div className="absolute top-2 right-2 z-10">
      <select
        value={cardVariant}
        onChange={(e) => setCardVariant(e.target.value)}
        className="p-2 rounded-md bg-white border"
      >
        <option value="default">Default</option>
        <option value="funny">Funny</option>
        <option value="professional">Professional</option>
        <option value="minimalist">Minimalist</option>
      </select>
    </div>
  );

  const ContributionGraphPlaceholder = () => (
    <ContributionGraph username={completeUserData.login} />
  );

  const TechBadge = ({ name, color }: { name: string; color: string }) => (
    <span
      className="px-2 py-1 m-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: color + "20",
        color: color,
      }}
    >
      {name}
    </span>
  );
  const DefaultProfileCard = () => (
    <div
      ref={cardRef}
      className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 md:p-10 py-10 px-5 overflow-hidden shadow-lg"
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <CardVariantSelector />
      <div className="flex md:flex-row flex-col items-center justify-between relative z-10">
        <div className="flex justify-between items-center md:w-1/2 w-full md:justify-start">
          <img
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-md hover:rotate-6 transition-transform"
            src={completeUserData.avatar_url}
            alt="GitHub Avatar"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-blue-800 flex items-center">
              {completeUserData.name || completeUserData.login}
              <Zap className="ml-2 text-yellow-500 animate-pulse" />
            </h2>
            <p className="text-blue-600">@{completeUserData.login}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white/30 rounded-full px-4 py-2 flex items-center">
            <span className="mr-2">👥</span>
            <span className="font-semibold text-blue-900">
              Followers: {completeUserData.followers}
            </span>
          </div>
          <div className="bg-white/30 rounded-full px-4 py-2 flex items-center">
            <span className="mr-2">🔍</span>
            <span className="font-semibold text-blue-900">
              Following: {completeUserData.following}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/50 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-3 flex items-center text-blue-800">
          <Rocket className="mr-2 text-blue-500 animate-bounce" />
          Tech Playground 🚀
        </h3>
        <div className="flex flex-wrap">
          {topLanguages?.slice(0, 5).map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 m-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: lang[1].color + "20",
                color: lang[1].color,
                boxShadow: `0 0 10px ${lang[1].color}20`,
              }}
            >
              {lang[0]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {[
          {
            icon: (
              <BookCopy className="w-6 h-6 text-blue-500 mb-2 animate-pulse" />
            ),
            value: completeUserData.public_repos,
            label: "Public Repos",
            emoji: "🧱",
            description: "Coding Sandbox",
          },
          {
            icon: (
              <GitMerge className="w-6 h-6 text-purple-500 mb-2 animate-spin-slow" />
            ),
            value: mergedPrCount,
            label: "PRs Merged",
            emoji: "🤝",
            description: "Collaboration Champion",
          },
          {
            icon: (
              <Cake className="w-6 h-6 text-green-500 mb-2 animate-bounce" />
            ),
            value: gitAge,
            label: "Years",
            emoji: "🚀",
            description: "Code Journey",
          },
          {
            icon: (
              <Flame className="w-6 h-6 text-orange-500 mb-2 animate-pulse" />
            ),
            value: gitStreak,
            label: "Days",
            emoji: "🔥",
            description: "Consistency Streak",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/50 p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform"
          >
            {item.icon}
            <p className="text-xl font-bold text-blue-800">{item.value}</p>
            <span className="text-sm text-blue-600">{item.label}</span>
            <span className="text-xs text-gray-600 flex items-center">
              {item.emoji} {item.description}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <ContributionGraphPlaceholder />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
    </div>
  );

  const ProfessionalProfileCard = () => (
    <div
      ref={cardRef}
      className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 shadow-xl md:p-10 py-10 px-5"
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      <CardVariantSelector />
      <div className="flex md:flex-row flex-col items-center justify-between">
        <div className="flex justify-between items-center md:w-1/2 w-full md:justify-start">
          <img
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md transform hover:scale-110 transition-transform"
            src={completeUserData.avatar_url}
            alt="Professional GitHub Profile"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {completeUserData.name || completeUserData.login}
              <Microscope className="ml-2 text-blue-600 animate-pulse" />
            </h2>
            <p className="text-gray-600">@{completeUserData.login}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white/30 rounded-full px-4 py-2 flex items-center">
            <span className="mr-2">📊</span>
            <span className="font-semibold text-gray-900">
              Followers: {completeUserData.followers}
            </span>
          </div>
          <div className="bg-white/30 rounded-full px-4 py-2 flex items-center">
            <span className="mr-2">🌐</span>
            <span className="font-semibold text-gray-900">
              Following: {completeUserData.following}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/50 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-3 flex items-center text-gray-800">
          <Zap className="mr-2 text-blue-500 animate-spin-slow" />
          Professional Tech Stack 💼
        </h3>
        <div className="flex flex-wrap">
          {topLanguages?.slice(0, 5).map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 m-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: lang[1].color + "20",
                color: lang[1].color,
                boxShadow: `0 0 10px ${lang[1].color}20`,
              }}
            >
              {lang[0]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {[
          {
            icon: (
              <BookCopy className="w-6 h-6 text-blue-600 mb-2 animate-pulse" />
            ),
            value: completeUserData.public_repos,
            label: "Repositories",
            emoji: "📁",
            description: "Professional Portfolio",
          },
          {
            icon: (
              <GitMerge className="w-6 h-6 text-green-600 mb-2 animate-spin-slow" />
            ),
            value: mergedPrCount,
            label: "PRs Merged",
            emoji: "🤝",
            description: "Enterprise Collaboration",
          },
          {
            icon: (
              <Cake className="w-6 h-6 text-blue-600 mb-2 animate-bounce" />
            ),
            value: gitAge,
            label: "Years",
            emoji: "🎓",
            description: "Professional Experience",
          },
          {
            icon: (
              <Flame className="w-6 h-6 text-green-600 mb-2 animate-pulse" />
            ),
            value: gitStreak,
            label: "Days",
            emoji: "📈",
            description: "Continuous Learning",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/50 p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform"
          >
            {item.icon}
            <p className="text-xl font-bold text-gray-800">{item.value}</p>
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-xs text-gray-500 flex items-center">
              {item.emoji} {item.description}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <ContributionGraphPlaceholder />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
    </div>
  );

  const MinimalistProfileCard = () => (
    <div
      ref={cardRef}
      className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 md:p-10 py-10 px-5 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 to-gray-600"></div>
      <CardVariantSelector />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            width={96}
            height={96}
            className="w-24 h-24 rounded-full grayscale object-cover border-2 border-gray-300 hover:grayscale-0 transition-all"
            src={completeUserData.avatar_url}
            alt="Minimalist GitHub Profile"
          />
          <div className="flex-grow ml-6">
            <h2 className="text-2xl font-light text-gray-800 flex items-center">
              {completeUserData.name || completeUserData.login}
              <Zap className="ml-2 text-gray-500 animate-pulse-slow" />
            </h2>
            <p className="text-gray-500 text-sm">@{completeUserData.login}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-white/30 rounded-full px-4 py-2 inline-block mb-2">
            <span className="text-sm text-gray-700">
              🗂️ {completeUserData.public_repos} Repos
            </span>
          </div>
          <div className="bg-white/30 rounded-full px-4 py-2 inline-block">
            <span className="text-sm text-gray-700">
              👥 {completeUserData.followers} Followers
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/50 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-lg font-light mb-3 text-gray-700 flex items-center">
          <Zap className="mr-2 text-gray-500 animate-spin-slow" />
          Tech Footprint 🚶‍♂️
        </h3>
        <div className="flex flex-wrap">
          {topLanguages?.slice(0, 5).map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 m-1 rounded-full text-sm font-light"
              style={{
                backgroundColor: lang[1].color + "20",
                color: lang[1].color,
                boxShadow: `0 0 10px ${lang[1].color}20`,
              }}
            >
              {lang[0]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {[
          {
            icon: (
              <BookCopy className="w-6 h-6 text-gray-500 mb-2 animate-pulse" />
            ),
            value: completeUserData.public_repos,
            label: "Repositories",
            emoji: "🖌️",
            description: "Minimalist Canvas",
          },
          {
            icon: (
              <GitMerge className="w-6 h-6 text-gray-500 mb-2 animate-spin-slow" />
            ),
            value: mergedPrCount,
            label: "PRs Merged",
            emoji: "🤝",
            description: "Subtle Teamwork",
          },
          {
            icon: (
              <Cake className="w-6 h-6 text-gray-500 mb-2 animate-bounce" />
            ),
            value: gitAge,
            label: "Years",
            emoji: "🌱",
            description: "Quiet Journey",
          },
          {
            icon: (
              <Flame className="w-6 h-6 text-gray-500 mb-2 animate-pulse" />
            ),
            value: gitStreak,
            label: "Days",
            emoji: "🕊️",
            description: "Gentle Consistency",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white/50 p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform"
          >
            {item.icon}
            <p className="text-xl font-light text-gray-800">{item.value}</p>
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-xs text-gray-500 flex items-center">
              {item.emoji} {item.description}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grayscale hover:grayscale-0 transition-all">
        <ContributionGraphPlaceholder />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 to-gray-600"></div>
    </div>
  );
  const FunnyProfileCard = () => (
    <div
      ref={cardRef}
      className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-r from-pink-200 to-purple-200 md:p-10 py-10 px-5 overflow-hidden shadow-xl"
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
      <CardVariantSelector />
      <div className="flex md:flex-row flex-col items-center justify-between relative z-10">
        <div className="flex justify-between items-center md:w-1/2 w-full md:justify-start">
          <img
            width={96}
            height={96}
            className="w-24 h-24 rounded-full border-4 border-white hover:rotate-12 transition-transform shadow-lg animate-pulse-slow"
            src={completeUserData.avatar_url}
            alt="GitHub Avatar (Coding Wizard!)"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold flex items-center text-purple-900">
              {completeUserData.name || completeUserData.login}
              <Rocket className="ml-2 text-purple-700 animate-bounce" />
            </h2>
            <p className="text-gray-700 text-sm">
              @{completeUserData.login} (Code Ninja 🥷)
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white/30 rounded-full px-4 py-2 flex items-center">
            <span className="mr-2 text-lg">🌟</span>
            <span className="font-semibold text-purple-900">
              Followers: {completeUserData.followers}
            </span>
          </div>
          <div className="bg-white/30 rounded-full px-4 py-2 flex items-center">
            <span className="mr-2 text-lg">🕵️</span>
            <span className="font-semibold text-purple-900">
              Following: {completeUserData.following}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/50 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-3 flex items-center text-purple-900">
          <Zap className="mr-2 text-yellow-500 animate-spin-slow" />
          Top Used Languages (AKA Coding Languages Spoken) 🎮
        </h3>
        <div className="flex flex-wrap">
          {topLanguages?.slice(0, 5).map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 m-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: lang[1].color + "20",
                color: lang[1].color,
                boxShadow: `0 0 10px ${lang[1].color}20`,
              }}
            >
              {lang[0]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white/50 p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform">
          <span className="flex items-center text-xl">
            <Flame className="w-6 h-6 mr-1 text-orange-600 animate-pulse" />
            {gitStreak} days
          </span>
          <span className="font-semibold text-purple-900 text-center mt-5">
            Days Without Touching Grass 🌿
          </span>
        </div>
        <div className="bg-white/50 p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform">
          <Trophy className="w-8 h-8 text-green-500 mb-2 animate-bounce" />
          <p className="text-xl text-purple-900">🏆 Public Repos</p>
          <p className="text-2xl font-bold text-green-700">
            {completeUserData.public_repos}
          </p>
        </div>
        <div className="bg-white/50 p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform">
          <span className="flex items-center text-xl">
            <Cake className="w-6 h-6 mr-1 text-green-600 animate-spin-slow" />
            {gitAge} years
          </span>
          <span className="font-semibold text-purple-900 text-center">
            Coded Before Dinosaurs 🦖
          </span>
        </div>
        <div className="bg-white/50 p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform">
          <span className="flex items-center text-xl">
            <GitMerge className="w-6 h-6 mr-1 text-purple-600 animate-ping" />
            {mergedPrCount}
          </span>
          <span className="font-semibold text-purple-900">PRs Merged</span>
          <span className="text-xs text-gray-600">Collaboration Wizard 🧙‍♂️</span>
        </div>
      </div>

      <div className="mt-4">
        <ContributionGraphPlaceholder />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
    </div>
  );

  const renderProfileCard = () => {
    switch (cardVariant) {
      case "funny":
        return <FunnyProfileCard />;
      case "professional":
        return <ProfessionalProfileCard />;
      case "minimalist":
        return <MinimalistProfileCard />;
      default:
        return <DefaultProfileCard />;
    }
  };

  return renderProfileCard();
}
