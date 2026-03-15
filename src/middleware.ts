import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get('akses_film')
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!hasAccess && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
}
