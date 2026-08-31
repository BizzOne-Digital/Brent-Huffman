import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(auth.userId).select("email name");

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { email: user.email, name: user.name },
  });
}
