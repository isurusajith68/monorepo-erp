import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

import { verifySessionToken } from './lib/verifySeessionToken'

// const protectedRoutes = ["/customers/"];
const publicRoutes = [
  '/login',
  '/signup',
  '/reset',
  '/forget',
  '/verify',
  '/auth/callback',
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute =
    path.startsWith('/customers') ||
    path.startsWith('/bank') ||
    path.startsWith('/dashboard') ||
    path.startsWith('/profile') ||
    path.startsWith('/invoices') ||
    path.startsWith('/vendors')

  const isPublicRoute = publicRoutes.includes(path)

  const token = cookies().get('authToken')?.value
  const session = await verifySessionToken(token)

  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  // const user = session?.userId ? getUserById(session.userId) : null;
  // console.log(user, "user");
  // if (!user && !isPublicRoute) {
  //   return NextResponse.redirect(new URL("/login", req.nextUrl));
  // }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
