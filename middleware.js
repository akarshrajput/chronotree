import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  console.log("Cookies:", request.cookies.getAll());
  console.log("Token:", token);

  const isLoggedIn = !!token;
  const pathname = request.nextUrl.pathname;

  const publicRoutes = [
    "/",
    "/login",
    "/features",
    "/pricing",
    "/about",
    "/contact",
  ];

  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
