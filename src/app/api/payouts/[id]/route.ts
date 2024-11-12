import db from "@/lib/primsa";
import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const token = cookies().get(COOKIES.Authorization)?.value;
  const session = await db.session.findFirst({ where: { token } });

  if (!session?.userId) {
    cookies().delete(COOKIES.Authorization);
    return NextResponse.json({ error: "Session Not Found" }, { status: 200 });
  }

  const id = Number(req.url.split("/")[5]);

  console.log(id);

  const payout = await db.payout.delete({ where: { id } });

  return NextResponse.json(
    { payout: payout, message: "successful delete" },
    { status: 200 }
  );
}
