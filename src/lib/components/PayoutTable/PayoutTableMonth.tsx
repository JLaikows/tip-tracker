import { payoutDays } from "@/app/api/users/[id]/payouts/route";
import { fullMonths } from "@/lib/local";
import { FC, useMemo, useState } from "react";
import PayoutTableDay from "./PayoutTableDay";

interface IPayoutTableMonth {
  payouts: payoutDays;
  month: number;
}

const PayoutTableMonth: FC<IPayoutTableMonth> = ({ payouts, month }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  const days = useMemo(() => Object.keys(payouts), [payouts]);

  return (
    <>
      <div style={{ borderBottom: "1px solid #dee2e6" }}>
        <div key={`month-${month}`} className="pb-4" onClick={toggle}>
          <div>{fullMonths[Number(month)]}</div>
        </div>
      </div>
      {isOpen &&
        days.map((day) => (
          <PayoutTableDay
            payouts={payouts[Number(day)]}
            label={`${month}/${day}`}
            day={Number(day)}
            key={`day=${day}`}
          />
        ))}
    </>
  );
};

export default PayoutTableMonth;
