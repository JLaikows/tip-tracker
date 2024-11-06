import { TInvoices } from "@/lib/types";
import { Panel } from "primereact/panel";
import { FC, useMemo } from "react";

interface IInvoiceTable {
  invoices: TInvoices;
}

const InvoiceTable: FC<IInvoiceTable> = ({ invoices }) => {
  const parsedInvoices = useMemo(
    () => Object.values(invoices || {}),
    [invoices]
  );

  return (
    <Panel
      header="Invoices"
      className="w-11/12 border-2 rounded-md max-w-[91.666667%]"
    >
      {parsedInvoices.map((invoice) => (
        <div
          key={`${invoice.id} - 13`}
          className="flex flex-row justify-between"
        >
          <div>{(invoice.id || "").toString().padStart(4, "0")}</div>
          <div>{invoice.amount}</div>
          <div>{invoice.clientName}</div>
          <div>{new Date(invoice.due || "").toDateString()}</div>
        </div>
      ))}
    </Panel>
  );
};

export default InvoiceTable;
