import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const isManager = req.auth?.user?.role === "MANAGER";

  // Protected routes
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isManagerRoute = nextUrl.pathname.startsWith("/manager");
  const isLoginRoute = nextUrl.pathname === "/login";

  // Redirect logged-in users from login page to their dashboard
  if (isLoginRoute && isLoggedIn) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    return NextResponse.redirect(new URL("/manager", nextUrl));
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/manager", nextUrl));
    }
  }

  // Protect manager routes
  if (isManagerRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/login"],
};
