import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchGitHubContributions } from "@/lib/utils";

interface Props {
  username: string;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export default function ContributionGraph({ username }: Props) {
  const { data: session } = useSession();
  const [contributions, setContributions] =
    useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(false);

  const getColorForContribution = (count: number) => {
    if (count === 0) return "bg-slate-200";
    if (count < 5) return "bg-green-300";
    if (count < 10) return "bg-green-500";
    if (count < 20) return "bg-green-600";
    return "bg-green-700";
  };

  const getMonthLabel = (date: string) => {
    return format(new Date(date), "MMM");
  };
  const getWeekStartMonth = (week: ContributionWeek) => {
    return getMonthLabel(week.contributionDays[0].date);
  };
  const shouldShowMonthLabel = (
    currentWeek: ContributionWeek,
    previousWeek: ContributionWeek | null
  ) => {
    const currentMonth = getWeekStartMonth(currentWeek);
    const previousMonth = previousWeek ? getWeekStartMonth(previousWeek) : null;
    return !previousWeek || currentMonth !== previousMonth;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubContributions(
          username,
          session?.user.accessToken as string
        );
        setContributions(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchData();
  }, [username, session]);

  if (!contributions || loading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="space-y-2 flex justify-between w-full">
          <div className="w-full mt-8 flex flex-col items-start">
            <div className="h-28 bg-gray-300 rounded w-full my-2"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex w-full justify-between flex-nowrap">
        {contributions.weeks.map((week: ContributionWeek, weekIndex: number) => (
          <div key={weekIndex} className="week flex">
            {shouldShowMonthLabel(week, contributions.weeks[weekIndex - 1]) && (
              <p className="text-center text-[10px] font-medium mb-1">
                {getWeekStartMonth(week)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="contribution-graph flex w-full justify-start flex-nowrap">
        {contributions.weeks.map((week: ContributionWeek, weekIndex: number) => (
          <div key={weekIndex} className="week flex flex-col">
            {week.contributionDays.map((day: ContributionDay, dayIndex: number) => (
              <div
                key={dayIndex}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className={`${getColorForContribution(
                  day.contributionCount
                )} inline-block rounded-sm m-[1px] md:w-3 md:h-3 w-[4px] h-[4px]`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
