import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { ProfileCardProps, UserData, CardVariant } from "@/types/profile-card";
import CardVariantSelector from "./card/CardSelector";
import ContributionGraph from "./ContributionGraph";
import DefaultProfileCard from "./card/card-types/defaultProfile";
import FunnyProfileCard from "./card/card-types/funnyProfile";
import ProfessionalProfileCard from "./card/card-types/professionalProfile";
import MinimalistProfileCard from "./card/card-types/minimalistProfile";
import linkedinProfile from "./card/card-types/linkedinProfile";
import { fetchMostUsedLanguages, getGitStreak } from "@/lib/utils/utils";
import { getGitAge } from "@/lib/utils/profiles-card";

const DEFAULT_USER: UserData = {
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

const ProfileCardSelector: React.FC<ProfileCardProps> = ({
  userData = {},
  mergedPrCount = 0,
  cardRef,
}) => {
  const completeUserData = { ...DEFAULT_USER, ...userData };
  const [cardVariant, setCardVariant] = useState<CardVariant>("default");
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

  const renderProfileCard = () => {
    const cardProps = {
      completeUserData,
      mergedPrCount,
      topLanguages,
      gitAge,
      gitStreak,
    };

    const cardComponents = {
      default: DefaultProfileCard,
      funny: FunnyProfileCard,
      professional: ProfessionalProfileCard,
      minimalist: MinimalistProfileCard,
      linkedin : linkedinProfile
    };

    const CardComponent = cardComponents[cardVariant];

    return (
      <div ref={cardRef}>
        <CardVariantSelector
          cardVariant={cardVariant}
          onChangeVariant={setCardVariant}
        />
        <CardComponent {...cardProps} />
      </div>
    );
  };

  return renderProfileCard();
};

export default ProfileCardSelector;
