import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createNewDiagram,
  generateDiagram,
} from "@/features/diagram/api/request";
import { ChatMessage, DiagramResponse } from "@/features/diagram/types";

export const useGenerateDiagram = (
  csrfToken: string,
  onSuccess: (data: ChatMessage) => void,
  onError: (error: Error) => void
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      generateDiagram(id, message, csrfToken),
    onSuccess: (data, variables) => {
      // Invalidate the infinite query to refetch messages
      queryClient.invalidateQueries({
        queryKey: ["messages", "infinite", variables.id],
      });
      onSuccess(data);
    },
    onError,
  });
};

export const useCreateNewDiagram = (
  csrfToken: string,
  onSuccess: (data: DiagramResponse) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (message: string) => createNewDiagram(message, csrfToken),
    onSuccess,
    onError,
  });
};
