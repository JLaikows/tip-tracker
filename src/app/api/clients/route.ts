import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { generateSerial } from "@/lib/utils";

export async function GET() {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    return NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }

  const clients = await db.client.findMany({
    where: { userId: session?.userId },
  });

  return NextResponse.json(
    { clients: _.keyBy(clients, "id") },
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

  const { name, state } = await req.json();

  const serial = await generateSerial(name, state);

  const client = await db.client.create({
    data: {
      name,
      state,
      serial,
      //used as an override for "Or null", as we already check if theres a user ID above
      userId: session?.userId as number,
    },
  });

  return NextResponse.json({ client }, { status: 200 });
}
