import { auth } from "@/lib/auth";

import { User } from "better-auth";
import { getSessionCookie } from "better-auth/cookies";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const isAuthenticated = async (
  request: NextRequest
): Promise<boolean> => {
  const sessionCookie = getSessionCookie(request);
  return !!sessionCookie;
};

export const getUser = async (): Promise<User | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return session.user;
};
