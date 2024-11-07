import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";

export async function GET() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    return NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }
  const invoices = await db.invoice.findMany({
    where: { userId: session?.userId, payed: false },
    include: { client: true },
  });

  const parsedInvoices = invoices.map((invoice) =>
    _.omit(
      {
        ...invoice,
        clientName: invoice.client.name,
      },
      ["client", "userId", "weekLabel", "payoutId", "clientId"]
    )
  );

  return NextResponse.json(
    { invoices: _.keyBy(parsedInvoices, "id") },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }

  const { amount, taxable, payed, due, clientId } = await req.json();

  const parsedDate = new Date(due);

  const invoice = await db.invoice.create({
    data: {
      amount,
      taxable,
      clientId,
      payed,
      due: parsedDate,
      //used as an override for "Or null", as we already check if theres a user ID above
      userId: session?.userId as number,
    },
    include: { client: true },
  });

  return NextResponse.json(
    { invoice: { ...invoice, clientName: invoice.client.name } },
    { status: 200 }
  );
}
