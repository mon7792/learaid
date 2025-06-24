import { useMutation } from "@tanstack/react-query";

import { generateDiagram } from "@/features/diagram/api/request";
import { ChatResponse } from "@/features/diagram/types";

export const useGenerateDiagram = (
    onSuccess: (data: ChatResponse) => void,
    onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: generateDiagram,
    onSuccess,
    onError,
  });
};
