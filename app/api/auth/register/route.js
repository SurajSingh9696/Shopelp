import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";
import { registerSchema, validatePayload } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";
import User from "@/models/User";

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  const limit = rateLimit({
    key: `register:${ip}`,
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
    max: Number(process.env.RATE_LIMIT_MAX || 120)
  });

  if (!limit.allowed) {
    return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const { error, value } = validatePayload(registerSchema, body);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email: value.email });
  if (existing) {
    return NextResponse.json({ success: false, error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await hashPassword(value.password);
  const user = await User.create({
    name: value.name,
    email: value.email,
    passwordHash
  });

  const accessToken = signAccessToken({ sub: user._id.toString() });
  const refreshToken = signRefreshToken({ sub: user._id.toString() });
  user.refreshTokenHash = await hashPassword(refreshToken);
  await user.save();

  const response = NextResponse.json({
    success: true,
    data: { user: { id: user._id.toString(), name: user.name, email: user.email } }
  });
  setAuthCookies(response, { accessToken, refreshToken, remember: true });
  return response;
}
