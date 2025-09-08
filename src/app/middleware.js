// src/middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/user") && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
