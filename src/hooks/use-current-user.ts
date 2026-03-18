// SWR hook for current authenticated user (session state). Returns { user, error, isLoading, mutate }.
// Source of truth for role/permissions resolution client-side.
// MOCKED for frontend-only project.
"use client";

import { CurrentUser } from "@/types";

export function useCurrentUser() {
  // Mocked user for frontend-only usage
  const data: CurrentUser = {
    id: 1,
    name: "Admin User",
    email: "admin@dominion.com",
    role: "admin",
    profilePhoto: null,
    status: true,
    lastLogin: new Date()
  };

  return {
    user: data,
    error: null,
    isLoading: false,
    mutate: async () => {} 
  };
}
