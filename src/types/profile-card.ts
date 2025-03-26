
import { RefObject } from 'react';

export interface UserData {
  login: string;
  name: string | null | undefined;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
  twitter_username: string | null;
}
export type ProfileCardProps = {
  userData?: Partial<UserData>;
  mergedPrCount?: number;
  cardRef?: RefObject<HTMLDivElement>;
};

export type CardVariant = 'default' | 'funny' | 'professional' | 'minimalist' | 'linkedin';

export type ProfileCardComponentProps = {
  completeUserData: UserData;
  mergedPrCount: number;
  topLanguages?: [string, { size: number; color: string }][];
  gitAge: number;
  gitStreak?: number;
};