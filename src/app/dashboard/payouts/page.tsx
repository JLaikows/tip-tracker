"use client";

import PayoutCreateForm from "@/lib/components/Forms/PayoutCreateForm";
import PayoutTable from "@/lib/components/PayoutTable";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePayoutStore } from "@/lib/hooks/payouts";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <Button
          className="p-button p-2 mt-4"
          style={{ backgroundColor: "purple" }}
          size="large"
          severity="secondary"
          raised
          onClick={() => setIsOpen(true)}
          label="Create Payout"
          icon="pi pi-plus"
          iconPos="right"
        />

        <PayoutTable payouts={state.payouts} weeks={state.weeks} />
        <Dialog
          header="Create Payout"
          visible={isOpen}
          onHide={() => setIsOpen(false)}
        >
          <PayoutCreateForm close={() => setIsOpen(false)} />
        </Dialog>
      </main>
    </div>
  );
}
