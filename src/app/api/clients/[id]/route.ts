import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { generateSerial } from "@/lib/utils";

export async function PATCH(req: NextRequest) {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }

  const id = Number(req.url.split("/")[5]);

  console.log(id);

  const { name, state, generateSerialCode } = await req.json();

  const client = await db.client.findFirst({ where: { id } });

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 200 });
  }

  let serial: string | undefined;

  if (name || state || generateSerialCode) {
    serial = await generateSerial(client.name, client.state);
  }

  const newClient = await db.client.update({
    where: { id },
    data: {
      name,
      state,
      serial,
    },
  });

  return NextResponse.json({ client: newClient }, { status: 200 });
}
