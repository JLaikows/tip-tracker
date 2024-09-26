import { TParsedPayouts } from "@/lib/types";
import { Panel } from "primereact/panel";
import { FC, useMemo } from "react";
import PayoutTableWeek from "./PayoutTableWeek";

interface IPayoutTable {
  payouts: TParsedPayouts;
}

const PayoutTable: FC<IPayoutTable> = ({ payouts }) => {
  const weeks: (keyof TParsedPayouts)[] = useMemo(
    () => Object.keys(payouts),
    [payouts]
  );

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
