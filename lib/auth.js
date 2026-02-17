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
  
  // Common cookie options
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
  };
  
  // Set access token (15 minutes)
  response.cookies.set("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 60 * 15  // 15 minutes
  });
  
  // Set refresh token (7 days or 30 days if remember is true)
  response.cookies.set("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7  // 30 days or 7 days
  });
}

export function clearAuthCookies(response) {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  };
  
  response.cookies.set("accessToken", "", cookieOptions);
  response.cookies.set("refreshToken", "", cookieOptions);
}

export function getAuthUserId(accessToken) {
  const decoded = verifyAccessToken(accessToken);
  return decoded?.sub || null;
}
