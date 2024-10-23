import { client, payout } from "@prisma/client";

export enum COOKIES {
  Authorization = "authorization",
}

export type TParsedPayout = payout & { client: client | null };

export type TParsedPayouts = Record<string, TParsedPayout[]>;

export type TDropdownOption = {
  label: string;
  value: string | number;
};

export type TDropdownOptions = TDropdownOption[];

export type TWeeklyStats = {
  totalEarned: number;
  totalOwed: number;
};
