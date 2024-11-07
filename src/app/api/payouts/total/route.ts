import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { getWeekLabel } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }

  let totalEarned = 0;

  const weekStart = 4;

  const weekLabel = getWeekLabel(new Date(Date.now()), weekStart);

  const payouts = await db.payout.findMany({
    where: { weekLabel },
    include: { client: true },
  });

  payouts.forEach((payout) => {
    totalEarned += payout.amount;
  });

  return NextResponse.json({ totalEarned }, { status: 200 });
}
