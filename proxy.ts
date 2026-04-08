import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  if (host.startsWith("bio.") && pathname === "/") {
    return NextResponse.rewrite(new URL("/bio", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
