import { TInvoices } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
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
          key={invoice.number || Math.random()}
          className="flex flex-row justify-between"
        >
          <div>{invoice.number}</div>
          <div>{formatCurrency(invoice.amount ?? 0)}</div>
          <div>{new Date(invoice.due || "").toDateString()}</div>
        </div>
      ))}
    </Panel>
  );
};

export default InvoiceTable;
