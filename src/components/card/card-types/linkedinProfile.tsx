import React from "react";
import { ProfileCardComponentProps } from "@/types/profile-card";
import { karla } from "@/app/fonts/font";
import { languageLogos } from "@/lib/constants";

const linkedinProfile: React.FC<ProfileCardComponentProps> = ({
  completeUserData,
  mergedPrCount,
  topLanguages,
  gitAge,
  gitStreak,
}) => {
  return (
    <div className="relative w-full h-[396px] bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden shadow-lg flex items-center p-8">
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-400 to-blue-600"></div>

      <div className="flex items-center w-full">
        <img
          className="w-48 h-48 rounded-full object-cover border-4 border-blue-200 mr-8"
          src={completeUserData.avatar_url}
          alt="GitHub Avatar"
        />

        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-blue-900">
            {completeUserData.name || completeUserData.login}{" "}
          </h1>
          <p className={`${karla.className} font-thin`}>
            ({completeUserData.login})
          </p>
          <p className="text-2xl text-blue-700 mb-4">
            Developer from {completeUserData.location}
          </p>

          <div className="flex space-x-4 mb-4">
            <div className="bg-white/30 rounded-full px-4 py-2">
              <span className="font-semibold text-blue-900">
                Followers: {completeUserData.followers}
              </span>
            </div>
            <div className="bg-white/30 rounded-full px-4 py-2">
              <span className="font-semibold text-blue-900">
                Public Repos: {completeUserData.public_repos}
              </span>
            </div>
          </div>

          <div className="bg-white/30 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2 text-blue-800">
              Top Technologies
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {topLanguages?.slice(0, 5).map((lang, index) => (
                <img
                  key={index}
                  src={languageLogos[lang[0]] || languageLogos["default"]}
                  alt={lang[0]}
                  className="w-12 h-12 rounded-full object-fill shadow-md"
                  style={{
                    border: `3px solid ${lang[1].color}`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <div className="bg-white/30 rounded-full px-4 py-2">
              <span className="font-semibold text-blue-900">
                Merged PRs: {mergedPrCount}
              </span>
            </div>
            <div className="bg-white/30 rounded-full px-4 py-2">
              <span className="font-semibold text-blue-900">
                GitHub Age: {gitAge} years
              </span>
            </div>
            <div className="bg-white/30 rounded-full px-4 py-2">
              <span className="font-semibold text-blue-900">
                Current Streak: {gitStreak} days
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-400 to-blue-600"></div>
    </div>
  );
};

export default linkedinProfile;
