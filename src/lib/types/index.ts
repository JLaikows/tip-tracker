import { client, payout } from "@prisma/client";

export enum COOKIES {
  Authorization = "authorization",
}

export type TParsedPayouts = Record<
  string,
  (payout & { client: client | null })[]
>;

export type TDropdownOption = {
  label: string;
  value: string | number;
};

export type TDropdownOptions = TDropdownOption[];
