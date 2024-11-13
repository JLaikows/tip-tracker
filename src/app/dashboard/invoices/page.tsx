"use client";

import UnpaidPayoutCreateForm from "@/lib/components/Forms/InvoiceCreateForm";
import InvoiceTable from "@/lib/components/InvoiceTable";
import { useInvoiceStore } from "@/lib/hooks/invoices";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { getInvoices } = useInvoiceStore.getState();
  const state = useInvoiceStore((state) => state);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <Button
          className=" p-button p-4 mt-4 w-11/12"
          style={{ backgroundColor: "purple" }}
          size="large"
          severity="secondary"
          raised
          onClick={() => setIsOpen(true)}
          icon="pi pi-plus"
          iconPos="bottom"
        />

        <InvoiceTable invoices={state.invoices} />
        <Dialog
          header="Create Invoice"
          visible={isOpen}
          onHide={() => setIsOpen(false)}
        >
          <UnpaidPayoutCreateForm close={() => setIsOpen(false)} />
          {/* <PayoutCreateForm close={() => setIsOpen(false)} /> */}
        </Dialog>
      </main>
    </div>
  );
}
