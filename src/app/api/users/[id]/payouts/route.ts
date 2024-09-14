import db from "@/lib/primsa";
import { payout } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type payoutDays = Record<number, payout[]>;
export type payoutMonths = Record<number, payoutDays>;

export async function GET(req: NextRequest) {
  const userId = Number(req.url.split("/")[5]);
  const payouts = await db.payout.findMany({ where: { userId } });

  const parsedPayouts: payoutMonths = {};

  const today = new Date(Date.now());

  payouts.forEach((payout) => {
    if (today.getFullYear() != payout.year) return;

    if (!parsedPayouts[payout.month]) {
      parsedPayouts[payout.month] = {};
    }

    if (!parsedPayouts[payout.month][payout.day]) {
      parsedPayouts[payout.month][payout.day] = [];
    }

    parsedPayouts[payout.month][payout.day].push(payout);
  });

  return NextResponse.json({ payouts: parsedPayouts }, { status: 200 });
}
