import { COOKIES } from "@/lib/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function POST() {
  if (!cookies().get(COOKIES.Authorization)) {
    return NextResponse.json({ message: "No Cookie Found" }, { status: 400 });
  }

  cookies().delete(COOKIES.Authorization);

  return NextResponse.json(
    { message: "Successful Cookie Delete" },
    { status: 200 }
  );
}
