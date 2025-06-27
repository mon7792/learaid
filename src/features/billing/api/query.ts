import { useQuery } from "@tanstack/react-query";
import { getTokens } from "./request";

export const useGetTokens = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: () => getTokens(),
    enabled,
  });
};
