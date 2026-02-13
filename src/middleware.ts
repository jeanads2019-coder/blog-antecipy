
import { type NextRequest } from 'next/server'
import { updateSession } from './lib/middleware-auth'

export async function middleware(request: NextRequest) {
    // Only process middleware for admin routes (and not internal nextjs files)
    if (request.nextUrl.pathname.startsWith('/admin')) {
        return await updateSession(request)
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api routes (if we want to exclude them, usually we include them)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
