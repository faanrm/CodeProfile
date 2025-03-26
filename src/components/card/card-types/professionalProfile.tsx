
import React from "react";
import { BookCopy, Cake, Flame, GitMerge, Microscope, Zap } from "lucide-react";
import { ProfileCardComponentProps } from "@/types/profile-card";
import ContributionGraphPlaceholder from "../ContributionGraph";
const ProfessionalProfileCard: React.FC<ProfileCardComponentProps> = ({
  completeUserData,
  mergedPrCount,
  topLanguages,
  gitAge,
  gitStreak,
}) => {
  return (
    <div className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 shadow-xl md:p-10 py-10 px-5">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

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
        <ContributionGraphPlaceholder username={completeUserData.login} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
    </div>
  );
};

export default ProfessionalProfileCard;
