import db from "@/lib/primsa";
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

  const payout = await db.payout.create({
    data: {
      amount,
      state,
      taxable,
      client,
      date: new Date(date),
      userId,
      owed,
    },
  });

  return NextResponse.json({ payout }, { status: 200 });
}
