import { ulid } from "ulidx";

import { userPurchase } from "@/schema";
import {
  enterUserPurchaseDetailsDB,
  getUserBillingTokens,
} from "@/features/billing/model";

//  TODO: depending ton the model, extract the input token and validate it.
// TODO:  shift this to cache for faster lookup
export const hasUserToken = async (userId: string): Promise<boolean> => {
  const result = await getUserBillingTokens(userId);
  return result > 0;
};

export const createUserPurchase = async (
  userId: string,
  stripeCustomerId: string,
  stripeCheckoutSessionId: string,
  stripePaymentIntentId: string
): Promise<void> => {
  const userPurchaseData = prepareUserPurchaseData(
    userId,
    stripeCheckoutSessionId,
    stripePaymentIntentId
  );
  await enterUserPurchaseDetailsDB(userId, stripeCustomerId, userPurchaseData);
};

const prepareUserPurchaseData = (
  userId: string,
  stripeCheckoutSessionId: string,
  stripePaymentIntentId: string
): typeof userPurchase.$inferInsert => {
  return {
    id: ulid(),
    userId,
    tokensAdded: 50000,
    pricePaid: 499,
    currency: "eur",
    stripeCheckoutSessionId,
    stripePaymentIntentId,
    status: "COMPLETED",
    timestamp: new Date(),
  };
};
