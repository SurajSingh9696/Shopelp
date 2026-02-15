import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { comparePassword } from "@/lib/password";
import { signAccessToken, verifyRefreshToken, setAuthCookies } from "@/lib/auth";
import User from "@/models/User";

export async function POST(request) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.json({ success: false, error: "Missing refresh token" }, { status: 401 });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded?.sub) {
    return NextResponse.json({ success: false, error: "Invalid refresh token" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(decoded.sub);
  if (!user || !user.refreshTokenHash) {
    return NextResponse.json({ success: false, error: "Invalid refresh token" }, { status: 401 });
  }

  const match = await comparePassword(refreshToken, user.refreshTokenHash);
  if (!match) {
    return NextResponse.json({ success: false, error: "Invalid refresh token" }, { status: 401 });
  }

  const accessToken = signAccessToken({ sub: user._id.toString() });
  const response = NextResponse.json({ success: true, data: { accessToken } });
  setAuthCookies(response, { accessToken, refreshToken, remember: true });
  return response;
}
