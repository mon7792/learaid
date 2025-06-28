import { UserResponse, UserTokenResponse } from "@/features/auth/types";

export const getUserInfo = async (): Promise<UserResponse> => {
  const response = await fetch(`/api/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to get user info");
  }
  return data;
};


export const getUserTokens = async (): Promise<UserTokenResponse> => {
  const response = await fetch(`/api/me/tokens`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to get user info");
  }
  return data;
};
