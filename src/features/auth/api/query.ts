import { useQuery } from "@tanstack/react-query";

import { getUserInfo, getUserTokens } from "@/features/auth/api/request";

export const useGetUserInfo = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
    enabled: enabled,
  });
};

export const useGetUserTokens = () => {
  return useQuery({
    queryKey: ["user-tokens"],
    queryFn: () => getUserTokens(),
    enabled: true,
    staleTime: 1000 * 10, // 10 seconds
  });
};
