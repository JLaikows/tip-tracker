"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TWeeklyStats } from "@/lib/types";
import { toast } from "react-toastify";
import WeeklyTotal from "@/lib/components/WeeklyTotal";

export default function Home() {
  const [weeklyStats, setWeeklyStats] = useState<TWeeklyStats>({
    totalEarned: 0,
  });

  const getData = useCallback(async () => {
    const weeklyStats = await axios.get(`/api/payouts/total`);

    if (weeklyStats.data.error) {
      toast.error(weeklyStats.data.error);
    } else {
      setWeeklyStats(weeklyStats.data);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <WeeklyTotal earned={weeklyStats.totalEarned} />
      </main>
    </div>
  );
}
