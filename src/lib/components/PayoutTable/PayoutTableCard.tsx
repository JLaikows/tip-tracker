import { TPayout } from "@/lib/types";
import { Card } from "primereact/card";
import { formatCurrency } from "@/lib/utils";
import { FC } from "react";

interface IPayoutTableCard {
  payout: TPayout;
}

const columns: (keyof TPayout)[] = ["state", "amount", "taxable"];

const PayoutTableCard: FC<IPayoutTableCard> = ({ payout }) => {
  const date = new Date(payout.date).toDateString();
  return (
    <div className="p-1 ">
      <Card
        key={`day-${payout.date}`}
        style={{ width: "95%" }}
        className="p-4 pb-2 pt-2 flex justify-between gap-6"
      >
        <div className="pb-4">
          <div className="font-bold">{payout.client?.name}</div>
          <div className="text-xs">{date}</div>
        </div>

        {columns.map((column) => {
          const dataPoint = payout[column];
          return (
            <div
              className="flex flex-row justify-between w-36"
              key={`${column}-${payout[column]}-${Math.random()}`}
            >
              <div>{column}</div>
              <div>
                {["amount"].includes(column)
                  ? formatCurrency(dataPoint as number)
                  : `${dataPoint}`}
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default PayoutTableCard;
