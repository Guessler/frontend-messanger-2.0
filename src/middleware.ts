import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register'];
const AUTH_ROUTES = ['/login', '/register'];

function isPublic(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
}

function isAuthOnly(pathname: string) {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (token && isAuthOnly(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token && !isPublic(pathname)) {
    if (!refreshToken) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACK}auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { cookie: `refresh_token=${refreshToken}` },
      }
    );

    console.log('refresh status:', refreshRes.status);
    console.log('set-cookie headers:', refreshRes.headers.getSetCookie());

    if (!refreshRes.ok) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    refreshRes.headers.getSetCookie().forEach((cookie) => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
