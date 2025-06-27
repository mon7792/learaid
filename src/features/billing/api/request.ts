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
  message: string
): Promise<UserTokenResponse> => {
  const response = await fetch("/api/me/tokens/estimate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
