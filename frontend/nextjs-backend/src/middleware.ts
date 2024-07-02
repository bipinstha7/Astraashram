import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DASHBOARD_ROUTE, PUBLIC_ROUTE_PREFIX } from './lib/constants';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authorization')?.value;

  /* check whether the authToken is valid or not */

  const adminSignInRoute = PUBLIC_ROUTE_PREFIX + '/sign-in';

  if (authToken) {
    if (
      request.nextUrl.pathname === '/' ||
      request.nextUrl.pathname.startsWith(PUBLIC_ROUTE_PREFIX)
    ) {
      return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.nextUrl));
    }
  }

  if (!authToken) {
    if (!request.nextUrl.pathname.startsWith(PUBLIC_ROUTE_PREFIX))
      return NextResponse.redirect(new URL(adminSignInRoute, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
