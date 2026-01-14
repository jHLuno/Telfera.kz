import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Session } from "next-auth";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  let session: Session | null = null;
  let hasInvalidSession = false;
  
  // Try to get session, handling errors gracefully
  try {
    session = await auth();
  } catch (error) {
    // Handle JWT decryption errors gracefully
    // These are expected when tokens are invalid/expired or AUTH_SECRET changed
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";
    const fullError = `${errorMessage} ${errorStack}`;
    
    const isExpectedError = 
      fullError.includes("decryption") || 
      fullError.includes("JWT") ||
      fullError.includes("JWTSessionError") ||
      fullError.includes("session") ||
      fullError.includes("no matching decryption secret");
    
    if (isExpectedError) {
      // This is expected - invalid/old tokens, we'll clear them below
      // Don't log these expected errors to reduce noise
      session = null;
      hasInvalidSession = true;
    } else {
      // Unexpected error - log in development only
      if (process.env.NODE_ENV === "development") {
        console.warn("[MIDDLEWARE] Unexpected auth error:", errorMessage);
      }
      session = null;
      hasInvalidSession = true;
    }
  }

  // Protected routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isManagerRoute = pathname.startsWith("/manager");
  const isLoginRoute = pathname === "/login";

  // If we have an invalid session, clear cookies and handle based on route
  if (hasInvalidSession) {
    const response = isLoginRoute 
      ? NextResponse.next() 
      : NextResponse.redirect(new URL("/login", request.url));
    
    // Expire all possible auth cookies immediately to prevent decryption errors
    const cookieNames = [
      "authjs.session-token",
      "__Secure-authjs.session-token",
      "authjs.csrf-token",
      "__Host-authjs.csrf-token",
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
    ];
    
    cookieNames.forEach((name) => {
      response.cookies.set(name, "", {
        expires: new Date(0),
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    });
    
    // Also clear any cookies that contain "auth" in the name
    request.cookies.getAll().forEach((cookie) => {
      if (cookie.name.toLowerCase().includes("auth")) {
        response.cookies.set(cookie.name, "", {
          expires: new Date(0),
          path: "/",
        });
      }
    });
    
    // Always return the response when we have invalid session
    // This clears the cookies and either redirects (protected routes) or allows login page
    return response;
  }

  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "ADMIN";
  const isManager = session?.user?.role === "MANAGER";

  // Redirect logged-in users from login page to their dashboard
  if (isLoginRoute && isLoggedIn) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (isManager) {
      return NextResponse.redirect(new URL("/manager", request.url));
    }
  }

  // Protect admin routes - MUST be logged in AND be admin
  if (isAdminRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isAdmin) {
      // If logged in but not admin, redirect to manager dashboard
      return NextResponse.redirect(new URL("/manager", request.url));
    }
  }

  // Protect manager routes - MUST be logged in AND be manager (admins redirected to admin dashboard)
  if (isManagerRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // If admin tries to access manager routes, redirect to admin dashboard
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/manager/:path*",
    "/login",
  ],
};
