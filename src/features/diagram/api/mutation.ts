import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      generateDiagram(id, message, csrfToken),
    onSuccess,
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
