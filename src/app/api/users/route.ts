import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";
import { generateToken } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[2];

  const session = await db.session.findFirst({
    where: { token },
    include: { user: true },
  });

  if (!session?.id) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
  // const user = await db.user.create({ data: { email } });
}

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json();

  const user = await db.user.findFirst({
    where: { email },
    select: { email: true, id: true, phone: true },
  });

  if (!user?.id) {
    return NextResponse.json({ error: "User Not Found" }, { status: 200 });
  }
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
