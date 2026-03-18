import { NextRequest, NextResponse } from "next/server";

// Auth middleware removed - project is now frontend-only
export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/:path*"],
};
