import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "@/features/auth/api/request";

export const useGetUserInfo = (
  enabled: boolean = false,
) => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
    enabled: enabled,
  });
};