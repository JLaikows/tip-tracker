import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";

export async function GET(req: any) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { phone }: { phone: string } = await req.json();

  const authenticationNumber = Math.floor(100000 + Math.random() * 900000);

  console.log(authenticationNumber, " ", phone);

  return NextResponse.json({ message: "success" }, { status: 200 });
}
