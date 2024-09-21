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
    const date = new Date(payout.date);

    if (today.getFullYear() != date.getFullYear()) return;

    const month = date.getMonth();
    const day = date.getDay();

    if (!parsedPayouts[month]) {
      parsedPayouts[month] = {};
    }

    if (!parsedPayouts[month][day]) {
      parsedPayouts[month][day] = [];
    }

    parsedPayouts[month][day].push(payout);
  });

  return NextResponse.json({ payouts: parsedPayouts }, { status: 200 });
}
