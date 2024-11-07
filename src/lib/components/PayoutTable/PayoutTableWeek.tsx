import { FC, useMemo, useState } from "react";
import PayoutTableCard from "./PayoutTableCard";
import { TPayoutsWeek } from "@/lib/types";

interface IPayoutTableDay {
  payoutWeekList: TPayoutsWeek;
  label: string;
}

const PayoutTableDay: FC<IPayoutTableDay> = ({ payoutWeekList, label }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  const payouts = useMemo(
    () => Object.values(payoutWeekList.payouts),
    [payoutWeekList]
  );

  return (
    <div style={{ borderBottom: "1px solid #dee2e6" }}>
      <div>
        <div
          key={`day-${label}`}
          className="pb-2 pt-2 pl-6 hover:cursor-pointer"
          onClick={toggle}
        >
          <div>{label}</div>
        </div>
      </div>
      <div>
        {isOpen && (
          <div>
            <div className="flex flex-row justify-between">
              <div>Earned: &nbsp;{payoutWeekList.earned}</div>
            </div>
            <div className="flex flex-row overflow-scroll no-scrollbar max-w-[310px] ">
              {payouts.map((payout) => (
                <PayoutTableCard payout={payout} key={Math.random()} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoutTableDay;
