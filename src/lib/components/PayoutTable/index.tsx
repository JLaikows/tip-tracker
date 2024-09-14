import { payout } from "@prisma/client";
import { Panel } from "primereact/panel";
import { FC } from "react";

interface IPayoutTable {
  payouts: payout[];
}

const PayoutTable: FC<IPayoutTable> = ({ payouts }) => {
  return (
    <Panel header="Payouts">
      {payouts.length > 0 &&
        payouts.map((payout: payout) => (
          <div
            className="flex flex-row gap-1"
            key={`${payout.amount}-${payout.day}-${payout.client}`}
          >
            <div>{payout.amount}</div>
            <div>{payout.year}</div>
            <div>{payout.month}</div>
            <div>{payout.day}</div>
            <div>{payout.client}</div>
            <div>{payout.state}</div>
          </div>
        ))}
    </Panel>
  );
};

export default PayoutTable;
