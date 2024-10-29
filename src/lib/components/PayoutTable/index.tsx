import { TPayouts } from "@/lib/types";
import { Panel } from "primereact/panel";
import { FC } from "react";
import PayoutTableWeek from "./PayoutTableWeek";

interface IPayoutTable {
  payouts: TPayouts;
  weeks: (keyof TPayouts)[];
}

const PayoutTable: FC<IPayoutTable> = ({ payouts, weeks }) => {
  return (
    <Panel
      header="Payouts"
      className="w-11/12 border-2 rounded-md max-w-[91.666667%]"
    >
      {weeks.map((week) => (
        <PayoutTableWeek
          label={week}
          payouts={payouts[week]}
          key={`week-${week}`}
        />
      ))}
    </Panel>
  );
};

export default PayoutTable;
