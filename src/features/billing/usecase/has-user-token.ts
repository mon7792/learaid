
import { getUserBillingTokens } from "../model";

//  TODO: depending ton the model, extract the input token and validate it.
// TODO:  shift this to cache for faster lookup
export const hasUserToken = async (userId: string): Promise<boolean> => {
  const result = await getUserBillingTokens(userId);
  return result > 0;
};  