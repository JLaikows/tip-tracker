import db from "@/lib/primsa";
import { getWeekLabel } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIES, TPayouts } from "@/lib/types";

export async function GET() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }
  const today = new Date(Date.now());
  const payouts = await db.payout.findMany({
    where: {
      userId: session?.userId,
      date: { gte: new Date(`01/01/${today.getFullYear()}`) },
    },
    include: { client: true },
  });

  const parsedPayouts: TPayouts = {};

  payouts.forEach((payout) => {
    const date = new Date(payout.date);

    //getWeekLabel is a temp fallback until old db entries are updated
    const weekLabel: keyof TPayouts = payout.weekLabel || getWeekLabel(date);

    if (!parsedPayouts[weekLabel]) {
      parsedPayouts[weekLabel] = {
        payouts: {},
        earned: 0,
      };
    }

    parsedPayouts[weekLabel].payouts[payout.id] = payout;
    parsedPayouts[weekLabel].earned += payout.amount;
  });
  return NextResponse.json({ payouts: parsedPayouts }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }

  const { amount, state, taxable = false, clientId, date } = await req.json();

  const parsedDate = new Date(date);

  const weekLabel = getWeekLabel(parsedDate);

  const payout = await db.payout.create({
    data: {
      amount,
      state,
      taxable,
      clientId,
      date: parsedDate,
      weekLabel,
      //used as an override for "Or null", as we already check if theres a user ID above
      userId: session?.userId as number,
    },
    include: { client: true },
  });

  return NextResponse.json({ payout }, { status: 200 });
}
