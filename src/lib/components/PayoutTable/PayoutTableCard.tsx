import { TPayout, TPayoutsWeek } from "@/lib/types";
import { Card } from "primereact/card";
import { formatCurrency } from "@/lib/utils";
import { FC, useState } from "react";
import { usePayoutStore } from "@/lib/hooks/payouts";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import axios from "axios";

interface IPayoutTableCard {
  payout: TPayout;
}

const columns: (keyof TPayout)[] = ["state", "amount", "taxable"];

const PayoutTableCard: FC<IPayoutTableCard> = ({ payout }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deletePayout } = usePayoutStore.getState();
  const date = new Date(payout.date).toDateString();

  const deletePayoutApiCall = async () => {
    try {
      const res = await axios.delete(`/api/payouts/${payout.id}`);

      if (!res.data.error) {
        //should be typed better, wil fix later - UPDATED NEEDED
        const id: keyof TPayoutsWeek =
          payout.id as unknown as keyof TPayoutsWeek;
        deletePayout(id, payout.weekLabel || "");
      }
    } catch (e) {
      toast.error(`Error Deleting payout: ${e}`);
    }

    setIsOpen(false);
  };

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
        <Button
          label="Delete"
          className="p-button p-2 mt-4 w-full"
          style={{ backgroundColor: "red" }}
          size="large"
          severity="secondary"
          raised
          onClick={() => setIsOpen(true)}
        />
      </Card>
      <Dialog visible={isOpen} onHide={() => setIsOpen(!isOpen)}>
        Do you wish to delete this payout?
        <div className="flex flex-row justify-around">
          <Button
            label="Delete"
            className="p-button p-2 w-10/12"
            style={{ backgroundColor: "red" }}
            size="large"
            severity="secondary"
            raised
            onClick={deletePayoutApiCall}
          />
          <Button
            label="Cancel"
            className="p-button p-2 w-10/12"
            size="large"
            severity="secondary"
            raised
            onClick={() => setIsOpen(false)}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default PayoutTableCard;
