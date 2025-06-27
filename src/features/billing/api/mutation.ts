import { useMutation } from "@tanstack/react-query";

import { UserTokenResponse } from "@/features/auth/types";
import { estimateTokensCost } from "./request";

export const useEstimateTokenCost = (
  onSuccess?: (data: UserTokenResponse) => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (message: string) => estimateTokensCost(message),
    onSuccess,
    onError,
  });
};

