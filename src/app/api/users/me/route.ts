import { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { Success, Error, Unauthorized } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return Unauthorized("No access token provided");
  }

  try {
    const decoded = await verifyAccessToken<{ sub: string }>(accessToken);
    const userId = decoded.sub;

    // Mock User response bypassing the DB
    const user = {
      id: 999,
      name: "Demo Admin",
      email: "demo@example.com",
      role: "Admin",
      profilePhoto: null,
      status: true,
      lastLogin: new Date(),
    };

    if (!user) {
      return Error("User not found", 404);
    }

    return Success(user);
  } catch (err) {
    console.error("Me endpoint error:", err);
    // This will catch expired tokens, invalid tokens, etc.
    return Unauthorized("Invalid access token");
  }
}
