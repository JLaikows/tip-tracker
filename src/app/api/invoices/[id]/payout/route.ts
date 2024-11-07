import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    return NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }
  const id = Number(req.url.split("/")[5]);

  const invoice = await db.invoice.update({
    where: { id },
    data: {
      payed: true,
    },
    include: { client: true },
  });

  if (!invoice?.id) {
    return NextResponse.json({ error: "Invoice Not Found" }, { status: 200 });
  }

  const { payedDate } = await req.json();

  const date = payedDate ? payedDate : new Date(Date.now());

  const payout = await db.payout.create({
    data: {
      amount: invoice.amount,
      state: invoice.client.state,
      taxable: invoice.taxable,
      clientId: invoice.clientId,
      invoiceId: invoice.id,
      date,
      //used as an override for "Or null", as we already check if theres a user ID above
      userId: session?.userId as number,
    },
    include: { invoice: true },
  });

  if (!payout.id) {
    return NextResponse.json(
      { error: "Failed to create Payout" },
      { status: 200 }
    );
  }

  return NextResponse.json({ payout }, { status: 200 });
}
