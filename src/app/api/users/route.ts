import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";

export async function GET(req: any) {
  // const { phone }: { phone: string } = await req.json();

  const user = await db.user.create({ data: { phone: "00000" } });
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json();

  const user = await db.user.findFirst({
    where: { email },
    select: { email: true, id: true, phone: true },
  });
  // const user = await db.user.create({ data: { email } });

  if (!user?.email) {
    return NextResponse.json({ error: "User Not Found" }, { status: 200 });
  }
  // const authenticationNumber = Math.floor(100000 + Math.random() * 900000);

  // console.log(authenticationNumber, " ", email);
  console.log("old user");
  return NextResponse.json({ user }, { status: 200 });
}
