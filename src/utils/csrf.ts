"use server";

import { headers } from "next/headers";

export const getCsrfToken = async (): Promise<string> => {
  const h = await headers();
  return h.get("X-CSRF-Token") || "";
};