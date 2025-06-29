import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { listDiagrams, listPaginatedMessages } from "@/features/diagram/api/request";


export const useInfiniteListMessages = (id: string, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ["messages", "infinite", id],
    queryFn: ({ pageParam }) => listPaginatedMessages(id, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
  });
};

export const useListDiagrams = (cursor?: string) => {
  return useQuery({
    queryKey: ["diagrams", cursor],
    queryFn: () => listDiagrams(cursor),
  });
};

export const useInfiniteListDiagrams = () => {
  return useInfiniteQuery({
    queryKey: ["diagrams", "infinite"],
    queryFn: ({ pageParam }) => listDiagrams(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
