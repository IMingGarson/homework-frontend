import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN_PATH = "/admin";
const EMPLOYEE_PATH = "/employee";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("JWT_TOKEN")?.value;
  const url = request.nextUrl;

  if (!token) {
    if (url.pathname.startsWith(ADMIN_PATH) || url.pathname.startsWith(EMPLOYEE_PATH)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      role: string;
    };

    if (url.pathname.startsWith(ADMIN_PATH) && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/employee", request.url));
    }

    if (url.pathname.startsWith(EMPLOYEE_PATH) && decoded.role !== "employee") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/login"],
};
