import { payout } from "@prisma/client";
import { Card } from "primereact/card";
import { FC } from "react";

interface IPayoutTableCard {
  payout: payout;
}

const USDollar = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

const columns: (keyof payout)[] = ["state", "amount", "owed", "taxable"];

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
          <div className="font-bold">{payout.client}</div>
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
                {["amount", "owed"].includes(column)
                  ? USDollar.format(dataPoint as number)
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
