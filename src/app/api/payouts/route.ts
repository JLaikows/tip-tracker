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
  } = await req.json();

  const [year, month, day] = date.split("-").map((str: string) => Number(str));

  const payout = await db.payout.create({
    data: { amount, state, taxable, client, year, month, day, userId },
  });

  return NextResponse.json({ payout }, { status: 200 });
}