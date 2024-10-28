import { client, payout, session, user } from "@prisma/client";

export enum COOKIES {
  Authorization = "authorization",
}

export type TParsedPayout = payout & { client?: TClient };

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

// Adding types for more consistent naming convention

export type TUser = user;

export type TPayout = payout;

export type TClient = client;

export type TSession = session;
