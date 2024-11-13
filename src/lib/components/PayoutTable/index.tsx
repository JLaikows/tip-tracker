import { TPayouts } from "@/lib/types";
import { Panel } from "primereact/panel";
import { FC, useMemo } from "react";
import PayoutTableWeek from "./PayoutTableWeek";

interface IPayoutTable {
  payouts: TPayouts;
}

const PayoutTable: FC<IPayoutTable> = ({ payouts }) => {
  const weeks = useMemo(() => Object.keys(payouts), [payouts]);
  return (
    <Panel className="w-11/12 border-2 rounded-md max-w-[91.666667%]">
      {weeks.map((week) => (
        <PayoutTableWeek
          label={week}
          payoutWeekList={payouts[week]}
          key={`week-${week}`}
        />
      ))}
    </Panel>
  );
};

export default PayoutTable;
