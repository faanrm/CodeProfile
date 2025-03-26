// src/components/ProfileCard/variants/FunnyProfileCard.tsx
import React from 'react';
import { 
  Cake, 
  Flame, 
  GitMerge, 
  Rocket, 
  Trophy, 
  Zap 
} from 'lucide-react';
import { ProfileCardComponentProps } from '@/types/profile-card';
import ContributionGraphPlaceholder from '../ContributionGraph';
const FunnyProfileCard: React.FC<ProfileCardComponentProps> = ({
  completeUserData,
  mergedPrCount,
  topLanguages,
  gitAge,
  gitStreak,
}) => {
  return (
    <div className="relative md:w-[840px] w-[360px] h-fit rounded-2xl bg-gradient-to-r from-pink-200 to-purple-200 md:p-10 py-10 px-5 overflow-hidden shadow-xl">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
      
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
        <ContributionGraphPlaceholder username={completeUserData.login} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
    </div>
  );
};

export default FunnyProfileCard;