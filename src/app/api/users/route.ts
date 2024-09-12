import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";

export async function GET(req: any) {
  // const { phone }: { phone: string } = await req.json();

  const user = await db.user.create({ data: { phone: "00000" } });
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { phone }: { phone: string } = await req.json();

  const user = await db.user.findFirst({ where: { phone } });

  if (!user) {
    const newUser = db.user.create({ data: { phone } });
    return NextResponse.json({ newUser }, { status: 200 });
  }
  // const authenticationNumber = Math.floor(100000 + Math.random() * 900000);

  // console.log(authenticationNumber, " ", phone);

  return NextResponse.json({ user }, { status: 200 });
}
