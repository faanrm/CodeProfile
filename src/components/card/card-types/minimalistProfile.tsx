import React from "react";
import { BookCopy, Cake, Flame, GitMerge, Zap } from "lucide-react";
import { ProfileCardComponentProps } from "@/types/profile-card";
import ContributionGraphPlaceholder from "../ContributionGraph";

const MinimalistProfileCard: React.FC<ProfileCardComponentProps> = ({
  completeUserData,
  mergedPrCount,
  topLanguages,
  gitAge,
  gitStreak,
}) => {
  return (
    <div className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 md:p-10 py-10 px-5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 to-gray-600"></div>

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
        <ContributionGraphPlaceholder username={completeUserData.login} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 to-gray-600"></div>
    </div>
  );
};

export default MinimalistProfileCard;
