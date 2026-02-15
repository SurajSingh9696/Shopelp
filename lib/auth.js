import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

export function signAccessToken(payload) {
  return jwt.sign(payload, accessSecret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m"
  });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || "30d"
  });
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, accessSecret);
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, refreshSecret);
  } catch {
    return null;
  }
}

export function setAuthCookies(response, { accessToken, refreshToken, remember }) {
  const isProd = process.env.NODE_ENV === "production";
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 60 * 15
  });
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7
  });
}

export function clearAuthCookies(response) {
  response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
  response.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });
}

export function getAuthUserId(accessToken) {
  const decoded = verifyAccessToken(accessToken);
  return decoded?.sub || null;
}
