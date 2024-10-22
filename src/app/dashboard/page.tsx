"use client";

import PayoutCreateForm from "@/lib/components/PayoutCreateForm";
import PayoutTable from "@/lib/components/PayoutTable";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { TParsedPayouts } from "@/lib/types";
import { toast } from "react-toastify";
import WeeklyTotal from "@/lib/components/WeeklyTotal";

export default function Home() {
  const [payouts, setPayouts] = useState<TParsedPayouts>({});

  const getPayouts = useCallback(async () => {
    const { data } = await axios.get(`/api/payouts`);

    if (data.error) {
      toast.error(data.error);
    } else {
      setPayouts(data.payouts);
    }
  }, []);

  useEffect(() => {
    getPayouts();
  }, [getPayouts]);

  return (
    <div className="flex items-center justify-items-center max-h-screen font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <WeeklyTotal />
        <PayoutCreateForm />
        <PayoutTable payouts={payouts} />
      </main>
    </div>
  );
}
