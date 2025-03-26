// src/components/ProfileCard/variants/DefaultProfileCard.tsx
import React from 'react';
import { 
  BookCopy, 
  Cake, 
  Flame, 
  GitMerge, 
  Rocket, 
  Zap 
} from 'lucide-react';
import { ProfileCardComponentProps } from '@/types/profile-card';
import ContributionGraphPlaceholder from '../ContributionGraph';
const DefaultProfileCard: React.FC<ProfileCardComponentProps> = ({
  completeUserData,
  mergedPrCount,
  topLanguages,
  gitAge,
  gitStreak,
}) => {
  return (
    <div className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 md:p-10 py-10 px-5 overflow-hidden shadow-lg">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      
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
            icon: <BookCopy className="w-6 h-6 text-blue-500 mb-2 animate-pulse" />,
            value: completeUserData.public_repos,
            label: "Public Repos",
            emoji: "🧱",
            description: "Coding Sandbox",
          },
          {
            icon: <GitMerge className="w-6 h-6 text-purple-500 mb-2 animate-spin-slow" />,
            value: mergedPrCount,
            label: "PRs Merged",
            emoji: "🤝",
            description: "Collaboration Champion",
          },
          {
            icon: <Cake className="w-6 h-6 text-green-500 mb-2 animate-bounce" />,
            value: gitAge,
            label: "Years",
            emoji: "🚀",
            description: "Code Journey",
          },
          {
            icon: <Flame className="w-6 h-6 text-orange-500 mb-2 animate-pulse" />,
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
        <ContributionGraphPlaceholder username={completeUserData.login} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
    </div>
  );
};

export default DefaultProfileCard;