import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Role-based access control 
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  Admin: [ '/admin', '/dashboard', '/settings', '/workflows', '/agents', '/policies'],
  Analyst: [ '/dashboard', '/workflows', '/agents', '/policies'],
  Viewer: [ '/dashboard'],
};

// Protected routes 
export const PROTECTED_ROUTES = [ '/admin', '/dashboard', '/settings'];

// Get user role from cookies
export function getUserRole(request: NextRequest): string | null {
  const userCookie = request.cookies.get('user')?.value;
  if (!userCookie) {
    return null;
  }
  
  try {
    const user = JSON.parse(userCookie);
    return user.role || null;
  } catch {
    return null;
  }
}

// Check if user has access to a route based on role
export function hasAccess(userRole: string | null, pathname: string): boolean {
  // If no role, deny access to protected routes
  if (!userRole) {
    return !PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  }

  // Check if user's role has permission for this route
  const allowedRoutes = ROLE_PERMISSIONS[userRole] || [];
  return allowedRoutes.some(route => pathname.startsWith(route));
}

// Get default route for a role
export function getDefaultRouteForRole(role: string): string {
  return '/dashboard'; // All roles default to dashboard
}

// Proxy function for role-based access control
export default function proxy(request: NextRequest) {
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

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    
    '/admin/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
  ],
}


