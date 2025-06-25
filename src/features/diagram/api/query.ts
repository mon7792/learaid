import { useQuery } from "@tanstack/react-query";
import { listMessages } from "./request";

export const useListMessages = (
  id: string,
  enabled: boolean,
  cursor?: string
) => {
  return useQuery({
    queryKey: ["messages", id, cursor],
    queryFn: () => listMessages(id, cursor),
    enabled,
  });
};