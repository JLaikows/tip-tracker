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

  const { amount, taxable, payed, due, clientId, createInvoiceNumber } =
    await req.json();

  const parsedDate = new Date(due);

  const client = await db.client.findFirst({ where: { id: clientId } });

  if (!client) {
    cookies().delete(COOKIES.Authorization);
    return NextResponse.json(
      { error: "Invalid Client Not Found" },
      { status: 200 }
    );
  }

  let unique = false;

  let number: string;

  const year = new Date(Date.now()).getFullYear();

  while (!unique) {
    const randomNumbers: number = Math.floor(100000 + Math.random() * 900000);

    number = client.serial + "-" + year + randomNumbers;

    const found = await db.invoice.findFirst({ where: { number } });

    if (!found) {
      unique = true;
    }
  }

  let invoice = await db.invoice.create({
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

  if (createInvoiceNumber) {
    const today = new Date(Date.now());

    const number =
      invoice.client.serial +
      "-" +
      today.getFullYear() +
      invoice.id +
      Math.floor(1000 + Math.random() * 9000);

    invoice = await db.invoice.update({
      where: { id: invoice.id },
      data: { number },
      include: { client: true },
    });
  }

  return NextResponse.json(
    { invoice: { ...invoice, clientName: invoice.client.name } },
    { status: 200 }
  );
}
