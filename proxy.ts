import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ROLE_PERMISSIONS: Record<string, string[]> = {
  Admin: [ '/admin', '/dashboard', '/settings', '/workflows', '/agents', '/policies'],
  Analyst: [ '/dashboard', '/workflows', '/agents', '/policies'],
  Viewer: [ '/dashboard'],
};

// Protected routes 
const PROTECTED_ROUTES = [ '/admin', '/dashboard', '/settings'];

// Get user role from cookies
function getUserRole(request: NextRequest): string | null {
  const userRole = request.cookies.get('userRole')?.value;
  return userRole || null;
}

// Check if user has access to a route
function hasAccess(userRole: string | null, pathname: string): boolean {
  // If no role, deny access to protected routes
  if (!userRole) {
    return !PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  }

  // Check if user's role has permission for this route
  const allowedRoutes = ROLE_PERMISSIONS[userRole] || [];
  return allowedRoutes.some(route => pathname.startsWith(route));
}

// Proxy function for role-based access control
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userRole = getUserRole(request);

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // If no user role, redirect to login
    if (!userRole) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has access based on role
    if (!hasAccess(userRole, pathname)) {
      // User doesn't have permission, redirect to unauthorized page or home
      const unauthorizedUrl = new URL('/', request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // Allow access - continue to the requested route
  return NextResponse.next();
}

// Default export for Next.js middleware (uses proxy function)
export default function middleware(request: NextRequest) {
  return proxy(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/about/:path*',
    '/admin/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
  ],
}


