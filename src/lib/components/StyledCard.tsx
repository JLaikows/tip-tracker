import { Panel } from "primereact/panel";
import { FC, ReactNode } from "react";

interface IStyledCard {
  title?: string;
  children: ReactNode;
}

const Card: FC<IStyledCard> = ({ children, title }) => {
  return (
    <Panel
      header={title}
      className="b-2 w-11/12 border-2 rounded-md max-w-[91.666667%]"
    >
      {children}
    </Panel>
  );
};

export default Card;
