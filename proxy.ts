import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const role = request.cookies.get('auth_role')?.value;
  const { pathname } = request.nextUrl;
  
  const isLoginPage = pathname === '/login' || pathname === '/';

  if (role) {
    // If logged in and trying to access login page, redirect to dashboard
    // This prevents going back to login page
    if (isLoginPage) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
    
    // Role-based route protection
    if (role === 'user' && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }
    if (role === 'admin' && pathname.startsWith('/user')) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  } else {
    // If not logged in and trying to access protected routes, redirect to login
    if (!isLoginPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all protected routes and login routes:
     * - /
     * - /login
     * - /admin/...
     * - /user/...
     */
    '/',
    '/login',
    '/admin/:path*',
    '/user/:path*'
  ],
}
