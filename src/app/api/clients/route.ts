import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";

export const generateSerial = async (name: string, state: string) => {
  let unique = false;

  const firstLetters =
    name.split("")[0].toUpperCase() + name.split("")[1].toUpperCase();
  let serial: string = "";

  //checks for rows with the same identifier in the DB
  //if none exist, it breaks the loop, allowing the client to be created
  while (!unique) {
    const numbers: number = Math.floor(100 + Math.random() * 900);

    const client = await db.client.findFirst({
      where: { serial: firstLetters + numbers },
    });

    if (!client) {
      unique = true;
      serial = firstLetters + state + numbers;
    }
  }

  return serial;
};

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
