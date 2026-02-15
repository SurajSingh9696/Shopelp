import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { clearAuthCookies, verifyRefreshToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(request) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (decoded?.sub) {
      await connectDB();
      await User.findByIdAndUpdate(decoded.sub, { refreshTokenHash: null });
    }
  }

  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}
