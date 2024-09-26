import { payout } from "@prisma/client";
import { FC, useState } from "react";
import PayoutTableCard from "./PayoutTableCard";

interface IPayoutTableDay {
  payouts: payout[];
  label: string;
}

const PayoutTableDay: FC<IPayoutTableDay> = ({ payouts, label }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div style={{ borderBottom: isOpen ? "" : "1px solid #dee2e6" }}>
        <div key={`day-${label}`} className="pb-2 pt-2 pl-6" onClick={toggle}>
          <div>{label}</div>
        </div>
      </div>
      <div className="flex flex-row overflow-scroll">
        {isOpen &&
          payouts.map((payout) => (
            <PayoutTableCard payout={payout} key={Math.random()} />
          ))}
      </div>
    </>
  );
};

export default PayoutTableDay;