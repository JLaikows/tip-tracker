import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { COOKIES } from "@/lib/types";

export async function GET() {
  const token = cookies().get(COOKIES.Authorization)?.value;

  const session = await db.session.findFirst({
    where: { token },
    include: { user: true },
  });

  if (!session?.id) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
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

  cookies().set({
    name: COOKIES.Authorization,
    value: token,
    httpOnly: true,
  });

  return NextResponse.json({ user, token: "Bearer " + token }, { status: 200 });
}

export async function DELETE() {
  const token = cookies().get(COOKIES.Authorization)?.value;

  const session = await db.session.delete({ where: { token } });

  if (!session.id) {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }

  cookies().delete(COOKIES.Authorization);

  return NextResponse.json(
    { message: "Successfully logged out" },
    { status: 200 }
  );
}
