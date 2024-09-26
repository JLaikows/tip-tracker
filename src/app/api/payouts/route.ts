import db from "@/lib/primsa";
import { getWeekLabel } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIES } from "../users/route";
import { payout } from "@prisma/client";

export type TParsedPayouts = Record<string, payout[]>;

export async function GET() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }
  const payouts = await db.payout.findMany();
  console.log(payouts);

  const parsedPayouts: TParsedPayouts = {};

  const today = new Date(Date.now());

  payouts.forEach((payout) => {
    const date = new Date(payout.date);

    if (today.getFullYear() != date.getFullYear()) return;

    //getWeekLabel is a temp fallback until old db entries are updated
    const key: keyof TParsedPayouts = payout.weekLabel || getWeekLabel(date);

    if (!parsedPayouts[key]) {
      parsedPayouts[key] = [];
    }

    parsedPayouts[key].push(payout);
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

  const {
    amount,
    state,
    taxable = false,
    client,
    date,
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
      //used as an override for "Or null", as we already check if theres a user ID above
      userId: session?.userId as number,
      owed,
    },
  });

  return NextResponse.json({ payout }, { status: 200 });
}
