"use client";

import PayoutCreateForm from "@/lib/components/PayoutCreateForm";
import PayoutTable from "@/lib/components/PayoutTable";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TWeeklyStats } from "@/lib/types";
import { toast } from "react-toastify";
import WeeklyTotal from "@/lib/components/WeeklyTotal";
import { usePayoutStore } from "@/lib/hooks/payouts";

export default function Home() {
  const { getPayouts } = usePayoutStore.getState();
  const state = usePayoutStore((state) => state);
  const [weeklyStats, setWeeklyStats] = useState<TWeeklyStats>({
    totalOwed: 0,
    totalEarned: 0,
  });

  const getData = useCallback(async () => {
    const error = await getPayouts();
    const weeklyStats = await axios.get(`/api/payouts/total`);

    if (error || weeklyStats.data.error) {
      toast.error(error || weeklyStats.data.error);
    } else {
      setWeeklyStats(weeklyStats.data);
    }
  }, [getPayouts]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <WeeklyTotal
          earned={weeklyStats.totalEarned}
          owed={weeklyStats.totalOwed}
        />
        <PayoutCreateForm />
        <PayoutTable payouts={state.payouts} weeks={state.weeks} />
      </main>
    </div>
  );
}
