import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Protected admin routes
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  
  // Login page
  const isLoginPage = nextUrl.pathname === '/login';

  // If trying to access admin without being logged in, redirect to login
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
  ],
};
