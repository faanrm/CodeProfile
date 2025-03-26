import { GitHubUser } from "@/types/github-user";
import { RefObject } from "react";

export type UserDetails = {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  blog: string;
  github_streak: number;
  github_age: number;
  contribution_graph_url: string;
  prs_merged: number;
};
export interface Props {
  username: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}
export interface ProfileCardProps {
  userData?: Partial<GitHubUser>;
  mergedPrCount?: number;
  cardRef?: RefObject<HTMLDivElement>;
}