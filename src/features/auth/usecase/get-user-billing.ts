import { getUserBilling as getUserBillingModel } from "@/features/auth/model";

export const getUserBilling = async (userId: string): Promise<{
    token: number;
    plan: string;
} | null> => {
  const result = await getUserBillingModel(userId);
  if (!result) {
    return null;
  }
  return {
    token: result.tokens,
    plan: result.plan,
  };
};  