import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Agar user login nahi hai → login page pe bhej do
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Sirf admin role allow
  if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // sirf /admin routes pe apply hoga
};
