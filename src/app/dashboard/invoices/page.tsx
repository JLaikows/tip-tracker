"use client";

import UnpaidPayoutCreateForm from "@/lib/components/Forms/unpaidPayoutCreateForm";
import InvoiceTable from "@/lib/components/InvoiceTable";
import { useInvoiceStore } from "@/lib/hooks/invoices";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { getInvoices } = useInvoiceStore.getState();
  const state = useInvoiceStore((state) => state);

  const getData = useCallback(async () => {
    const error = await getInvoices();

    if (error) {
      toast.error(error);
    }
  }, [getInvoices]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="flex items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4 ">
      <main className="flex flex-col gap-8 row-start-2 items-center w-screen min-h-80 sm:items-start md:flex-row">
        <UnpaidPayoutCreateForm />
        <InvoiceTable invoices={state.invoices} />
      </main>
    </div>
  );
}
