import { payoutMonths } from "@/app/api/users/[id]/payouts/route";
import { Panel } from "primereact/panel";
import { FC, useMemo } from "react";
import PayoutTableMonth from "./PayoutTableMonth";

interface IPayoutTable {
  payouts: payoutMonths;
}

const PayoutTable: FC<IPayoutTable> = ({ payouts }) => {
  const months = useMemo(() => Object.keys(payouts), [payouts]);

  return (
    <Panel header="Payouts" className="w-4/5">
      {months.map((month) => (
        <PayoutTableMonth
          month={Number(month)}
          payouts={payouts[Number(month)]}
          key={`${month}-month`}
        />
      ))}
    </Panel>
  );
};

export default PayoutTable;
