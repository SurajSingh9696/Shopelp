import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
  // Define protected routes
  const isProtectedRoute = pathname.startsWith("/dashboard") || 
                          pathname.startsWith("/api") && 
                          !pathname.startsWith("/api/auth/login") && 
                          !pathname.startsWith("/api/auth/register");
  
  // Define auth routes (login/register pages)
  const isAuthRoute = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  
  // If trying to access protected route without tokens, redirect to login
  if (isProtectedRoute && !accessToken && !refreshToken) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }
  
  // If logged in user tries to access auth pages, redirect to dashboard
  if (isAuthRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
