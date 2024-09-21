import db from "@/lib/primsa";
import { NextResponse } from "next/server";

export async function GET() {
  const payouts = await db.payout.findMany();
  return NextResponse.json({ payouts }, { status: 200 });
}

export async function POST() {
  const payouts = await db.payout.findMany();

  const newPayouts = payouts.map(async (po) => {
    const newPayout = await db.payout.update({
      where: { id: po.id },
      data: { ...po, date: new Date(`${po.year}-${po.month}-${po.day}`) },
    });
    return newPayout;
  });

  return NextResponse.json({ message: "success", newPayouts }, { status: 200 });
}
