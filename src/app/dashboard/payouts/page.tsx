"use client";

import PayoutCreateForm from "@/lib/components/Forms/PayoutCreateForm";
import PayoutTable from "@/lib/components/PayoutTable";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { usePayoutStore } from "@/lib/hooks/payouts";

export default function Home() {
  const { getPayouts } = usePayoutStore.getState();
  const state = usePayoutStore((state) => state);

  const getData = useCallback(async () => {
    const error = await getPayouts();

    if (error) {
      toast.error(error);
    }
  }, [getPayouts]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <PayoutCreateForm />
        <PayoutTable payouts={state.payouts} weeks={state.weeks} />
      </main>
    </div>
  );
}
