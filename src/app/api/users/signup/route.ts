import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/primsa";
import { generateToken } from "@/lib/utils";
import bycrpt from "bcrypt";
import { cookies } from "next/headers";
import { COOKIES } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { email, password }: { email: string; password: string } =
    await req.json();

  const foundUser = await db.user.findFirst({
    where: { email },
    select: { email: true, id: true, phone: true },
  });

  if (foundUser?.id) {
    return NextResponse.json({ error: "User Already Exists" }, { status: 200 });
  }

  const encryptedPassword = await bycrpt.hash(password, 10);

  const user = await db.user.create({
    data: { email, password: encryptedPassword },
  });
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
