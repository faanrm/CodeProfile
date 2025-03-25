import axios from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LanguageNode {
  name: string;
  color: string;
}

interface LanguageEdge {
  size: number;
  node: LanguageNode;
}

interface RepositoryNode {
  name: string;
  primaryLanguage: LanguageNode | null; 
  languages: {
    edges: LanguageEdge[];
  };
}

interface UserRepositories {
  nodes: RepositoryNode[];
}

interface User {
  repositories: UserRepositories;
}

interface GraphQLResponse {
  data: {
    user: User;
  };
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export const fetchMergedPrCount = async (
  username: string,
  accessToken: string
) => {
  try {
    const query = `
    {
      user(login:"${username}") {
        pullRequests(states: MERGED) {
          totalCount
        }
      }
    }
  `;
    const res = await axios.post(
      GITHUB_GRAPHQL_API,
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const mergedPRCount = res.data.data.user.pullRequests.totalCount;
    return mergedPRCount;
  } catch (err) {
    console.log("error fetching merged pr count: ", err);
  }
};

export const getGitAge = (created: string) => {
  const createdAt = new Date(created);
  const currentDate = new Date();

  const gitAge = currentDate.getFullYear() - createdAt.getFullYear();

  if (
    currentDate.getMonth() < createdAt.getMonth() ||
    (currentDate.getMonth() === createdAt.getMonth() &&
      currentDate.getDate() < createdAt.getDate())
  ) {
    return gitAge - 1;
  }

  return gitAge;
};

export const getGitStreak = async (username: string, accessToken: string) => {
  const query = `{
    user(login:"${username}") {
             contributionsCollection{
                   contributionCalendar{
                         weeks{
                            contributionDays{
                                  date,
                                  contributionCount
                               }
                          }
                     }
                }
            }
      }`;
  try {
    const res = await axios.post(
      GITHUB_GRAPHQL_API,
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const contributionWeeks =
      res.data.data.user.contributionsCollection.contributionCalendar.weeks;
    let currentStreak = 0;
    let longestStreak = 0;

    for (let i = 0; i < contributionWeeks.length; i++) {
      const days = contributionWeeks[i].contributionDays;

      for (let j = 0; j < days.length; j++) {
        const contributions = days[j].contributionCount;

        if (contributions > 0) {
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }
    }

    return longestStreak;
  } catch (err) {
    console.error("Error fetching git streak : ", err);
  }
};

export const fetchMostUsedLanguages = async (
  username: string,
  accessToken: string
) =>  {
  try {
    console.log(username, accessToken);
    const query = `{
            user(login:"${username}"){
                repositories(first:100,ownerAffiliations:OWNER) {
                    nodes{
                        name
                        primaryLanguage{
                            name
                            color
                        }
                        languages(first:5) {
                            edges{
                                size
                                node{
                                    name
                                    color
                                }
                            }
                        }
                    }
                }
            }
        }`;

    const res = await axios.post<GraphQLResponse>(
      GITHUB_GRAPHQL_API,
      { query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const repositories = res.data.data.user.repositories.nodes;

    const languageUsage: Record<string, { size: number; color: string }> = {};

    repositories.forEach((repo) => {
      repo.languages.edges.forEach((lang) => {
        const languageName = lang.node.name;
        const languageSize = lang.size;
        const languageColor = lang.node.color;

        if (!languageUsage[languageName]) {
          languageUsage[languageName] = { size: 0, color: languageColor };
        }

        languageUsage[languageName].size += languageSize;
      });
    });

    const sortedLanguages = Object.entries(languageUsage).sort(
      ([, a], [, b]) => b.size - a.size
    );
    return sortedLanguages;
  } catch (err) {
    console.error("Error fetching most used languages : ", err);
  }
};

export const fetchGitHubContributions = async (
  username: string,
  accessToken: string
) => {
  try {
    const query = `
        query ($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

    const response = await axios.post(
      GITHUB_GRAPHQL_API,
      {
        query,
        variables: { username },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data.user.contributionsCollection.contributionCalendar;
  } catch (err) {
    console.error("Error fetching contribution data:", err);
  }
};
