import { UserTokenResponse } from "@/features/auth/types";

export const getTokens = async (): Promise<UserTokenResponse> => {
  const response = await fetch(`/api/me/tokens`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to get tokens");
  }
  return data;
};

export const estimateTokensCost = async (
  message: string,
  csrfToken: string
): Promise<UserTokenResponse> => {
  const response = await fetch("/api/me/tokens/estimate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({ message }),
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "failed to estimate tokens cost");
  }
  return data;
};
