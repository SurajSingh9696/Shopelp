import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/password";
import { signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";
import { loginSchema, validatePayload } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";
import User from "@/models/User";

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  const limit = rateLimit({
    key: `login:${ip}`,
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
    max: Number(process.env.RATE_LIMIT_MAX || 120)
  });

  if (!limit.allowed) {
    return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(loginSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ email: value.email });
  if (!user) {
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  }

  const match = await comparePassword(value.password, user.passwordHash);
  if (!match) {
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  }

  const accessToken = signAccessToken({ sub: user._id.toString() });
  const refreshToken = signRefreshToken({ sub: user._id.toString() });
  user.refreshTokenHash = await hashPassword(refreshToken);
  await user.save();

  const response = NextResponse.json({
    success: true,
    data: { user: { id: user._id.toString(), name: user.name, email: user.email } }
  });
  setAuthCookies(response, {
    accessToken,
    refreshToken,
    remember: Boolean(value.remember)
  });
  return response;
}
