import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
  // Check if it's a protected API route (exclude login and register)
  const isProtectedAPI = pathname.startsWith("/api") && 
                         !pathname.startsWith("/api/auth/login") && 
                         !pathname.startsWith("/api/auth/register");
  
  // Check if it's a dashboard route
  const isDashboard = pathname.startsWith("/dashboard");
  
  // If no tokens, deny access
  if (!accessToken && !refreshToken) {
    if (isProtectedAPI) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    if (isDashboard) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*"
  ],
};
