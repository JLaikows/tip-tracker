import db from "@/lib/primsa";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = Number(req.url.split("/")[5]);
  const payouts = await db.payout.findMany({ where: { userId } });
  return NextResponse.json({ payouts }, { status: 200 });
}
