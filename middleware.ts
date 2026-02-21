import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Avoid Intl canonicalization crashes on malformed bot headers by
  // letting Negotiator choose directly from supported locales.
  try {
    const locale = new Negotiator({ headers: negotiatorHeaders }).language(
      locales
    );
    return locale ?? i18n.defaultLocale;
  } catch {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
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

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|scroll-down.gif|_next/static|_next/public/assets|_next/image|_ipx|_next/_ipx|_ipx/w_640,q_75|_next/_ipx/w_640,q_75|assets|images|favicon.ico|sw.js|robots.txt|manifest.json|.*\\..*).*)",
  ],
};
