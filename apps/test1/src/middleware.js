"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = middleware;
const server_1 = require("next/server");
const headers_1 = require("next/headers");
const verifySeessionToken_1 = require("./lib/verifySeessionToken");
// const protectedRoutes = ["/customers/"];
const publicRoutes = [
    '/login',
    '/signup',
    '/reset',
    '/forget',
    '/verify',
    '/auth/callback',
];
async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = path.startsWith('/customers') ||
        path.startsWith('/bank') ||
        path.startsWith('/dashboard') ||
        path.startsWith('/profile') ||
        path.startsWith('/invoices') ||
        path.startsWith('/vendors');
    const isPublicRoute = publicRoutes.includes(path);
    const token = (0, headers_1.cookies)().get('authToken')?.value;
    const session = await (0, verifySeessionToken_1.verifySessionToken)(token);
    if (!isPublicRoute && !session?.userId) {
        return server_1.NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    // const user = session?.userId ? getUserById(session.userId) : null;
    // console.log(user, "user");
    // if (!user && !isPublicRoute) {
    //   return NextResponse.redirect(new URL("/login", req.nextUrl));
    // }
    if (isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/dashboard')) {
        return server_1.NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
    return server_1.NextResponse.next();
}
exports.config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
