import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyAccessToken(accessToken);
  if (!decoded?.sub) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(decoded.sub).select("name email");
  if (!user) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: { user: { id: user._id.toString(), name: user.name, email: user.email } }
  });
}
