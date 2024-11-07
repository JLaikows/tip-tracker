import { client, invoice, payout, session, user } from "@prisma/client";
import { NextRequest } from "next/server";

export type { TGenerateToken, TGetWeekStartDate, TGetWeekLabel } from "./utils";

export enum COOKIES {
  Authorization = "authorization",
}

export type TPayoutsWeek = {
  payouts: Record<string, TPayout>;
  earned: number;
};

export type TPayouts = Record<string, TPayoutsWeek>;

export type TInvoices = Record<string, TParsedInvoice>;

export type TParsedInvoice = Partial<TInvoice> & { clientName: string | null };

export type TDropdownOption = {
  label: string;
  value: string | number;
};

export type TDropdownOptions = TDropdownOption[];

export type TWeeklyStats = {
  totalEarned: number;
};

export type authFormData = {
  email: string;
  password: string;
};

export type TAuthNextRequest = NextRequest & {
  session: (TSession & { user: TUser }) | null;
};

// Adding types for more consistent naming convention

export type TUser = user;

export type TPayout = payout & { client: TClient | null };

export type TClient = client;

export type TSession = session;

export type TInvoice = invoice;
