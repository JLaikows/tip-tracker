import db from "@/lib/primsa";
import { getWeekLabel } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    amount,
    state,
    taxable = false,
    client,
    date,
    userId,
    owed = 0,
  } = await req.json();

  const parsedDate = new Date(date);

  const weekLabel = getWeekLabel(parsedDate);

  const payout = await db.payout.create({
    data: {
      amount,
      state,
      taxable,
      client,
      date: parsedDate,
      weekLabel,
      userId,
      owed,
    },
  });

  return NextResponse.json({ payout }, { status: 200 });
}
