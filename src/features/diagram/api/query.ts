import { useQuery } from "@tanstack/react-query";

import { listDiagrams, listMessages } from "@/features/diagram/api/request";

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

export const useListDiagrams = (cursor?: string) => {
  return useQuery({
    queryKey: ["diagrams", cursor],
    queryFn: () => listDiagrams(cursor),
  });
};
