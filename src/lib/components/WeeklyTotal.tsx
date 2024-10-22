import { FC } from "react";
import StyledCard from "./StyledCard";

interface IWeeklyTotal {
  earned: number;
  owed: number;
}

const WeeklyTotal: FC<IWeeklyTotal> = ({ earned, owed }) => {
  return (
    <StyledCard title="Weekly Stats">
      <div className="flex flex-row justify-between pb-2">
        <div className="text-2xl font-bold">Total Earned:&nbsp;</div>
        <div className="text-3xl text-green-800 font-bold">${`${earned}`}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-1xl">Total Owed:&nbsp;</div>
        <div className="text-1xl text-blue-800 font-bold">${`${owed}`}</div>
      </div>
    </StyledCard>
  );
};

export default WeeklyTotal;
