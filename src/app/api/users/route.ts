import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { COOKIES } from "@/lib/types";
import bcrypt from "bcrypt";

export async function GET() {
  const token = cookies().get(COOKIES.Authorization)?.value;

  const session = await db.session.findFirst({
    where: { token },
    include: { user: true },
  });

  if (!session?.id || !token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: session.user }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { email, password }: { email: string; password: string } =
    await req.json();

  const user = await db.user.findFirst({
    where: { email },
    select: { email: true, id: true, phone: true, password: true },
  });

  if (!user?.id) {
    return NextResponse.json({ error: "User Not Found" }, { status: 200 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password || "");

  if (!passwordMatch) {
    return NextResponse.json({ error: "Incorrect Password" }, { status: 200 });
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
