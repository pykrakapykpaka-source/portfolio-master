import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Fast path for root: always redirect to default locale without detection.
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}`, request.url)
    );
  }

  // Skip locale handling for Next internals, static assets, and any "file-like" path.
  // This is important for `next/image` because the optimizer fetches `/images/...` internally.
  const PUBLIC_FILE = /\.(.*)$/;

  // Exclude public files and specific paths from locale handling
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/sw.js") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/manifest.json") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale (use defaultLocale to avoid Intl.getCanonicalLocales crashes in Edge)
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|scroll-down.gif|_next/static|_next/public/assets|_next/image|_ipx|_next/_ipx|_ipx/w_640,q_75|_next/_ipx/w_640,q_75|assets|images|favicon.ico|sw.js|robots.txt|manifest.json|.*\\..*).*)",
  ],
};
