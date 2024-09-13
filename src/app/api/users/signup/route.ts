import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";
import { generateToken } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json();

  const foundUser = await db.user.findFirst({
    where: { email },
    select: { email: true, id: true, phone: true },
  });

  if (foundUser?.id) {
    return NextResponse.json({ error: "User Already Exists" }, { status: 200 });
  }

  const user = await db.user.create({ data: { email } });
  const token = generateToken(112);

  const session = await db.session.create({
    data: {
      token,
      userId: user.id,
    },
  });

  if (!session.id) {
    return NextResponse.json(
      { error: "Failed to create sesssion" },
      { status: 500 }
    );
  }

  return NextResponse.json({ user, token: "Bearer " + token }, { status: 200 });
}
