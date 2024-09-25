import { getWeekLabel } from "@/lib/utils";
import db from "@/lib/primsa";
import { payout } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type TParsedPayouts = Record<string, payout[]>;

export async function GET(req: NextRequest) {
  const userId = Number(req.url?.split("/")[5]);
  const payouts = await db.payout.findMany({ where: { userId } });

  const parsedPayouts: TParsedPayouts = {};

  const today = new Date(Date.now());

  payouts.forEach((payout) => {
    const date = new Date(payout.date);

    if (today.getFullYear() != date.getFullYear()) return;

    const key: keyof TParsedPayouts = payout.weekLabel || getWeekLabel(date);

    if (!parsedPayouts[key]) {
      parsedPayouts[key] = [];
    }

    parsedPayouts[key].push(payout);
  });
  return NextResponse.json({ payouts: parsedPayouts }, { status: 200 });
}
