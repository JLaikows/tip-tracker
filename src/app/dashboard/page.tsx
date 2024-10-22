"use client";

import PayoutCreateForm from "@/lib/components/PayoutCreateForm";
import PayoutTable from "@/lib/components/PayoutTable";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TParsedPayouts, TWeeklyStats } from "@/lib/types";
import { toast } from "react-toastify";
import WeeklyTotal from "@/lib/components/WeeklyTotal";

export default function Home() {
  const [payouts, setPayouts] = useState<TParsedPayouts>({});
  const [weeklyStats, setWeeklyStats] = useState<TWeeklyStats>({
    totalOwed: 0,
    totalEarned: 0,
  });

  const getData = useCallback(async () => {
    const payouts = await axios.get(`/api/payouts`);
    const weeklyStats = await axios.get(`/api/payouts/total`);

    if (payouts.data.error || weeklyStats.data.error) {
      toast.error(payouts.data.error || weeklyStats.data.error);
    } else {
      setWeeklyStats(weeklyStats.data);
      setPayouts(payouts.data.payouts);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="flex items-center justify-items-center max-h-screen font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <WeeklyTotal
          earned={weeklyStats.totalEarned}
          owed={weeklyStats.totalOwed}
        />
        <PayoutCreateForm />
        <PayoutTable payouts={payouts} />
      </main>
    </div>
  );
}
