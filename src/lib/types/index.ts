import { client, payout, session, user } from "@prisma/client";

export enum COOKIES {
  Authorization = "authorization",
}

export type TPayoutsWeek = {
  payouts: TPayout[];
  earned: number;
  owed: number;
};

export type TPayouts = Record<string, TPayoutsWeek>;

export type TDropdownOption = {
  label: string;
  value: string | number;
};

export type TDropdownOptions = TDropdownOption[];

export type TWeeklyStats = {
  totalEarned: number;
  totalOwed: number;
};

// Adding types for more consistent naming convention

export type TUser = user;

export type TPayout = payout & { client: TClient | null };

export type TClient = client;

export type TSession = session;
