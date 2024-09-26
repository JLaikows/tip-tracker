import { payout } from "@prisma/client";

export enum COOKIES {
  Authorization = "authorization",
}

export type TParsedPayouts = Record<string, payout[]>;
