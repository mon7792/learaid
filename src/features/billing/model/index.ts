import { eq } from "drizzle-orm";

import { userBilling, userPurchase } from "@/schema";
import { db } from "@/config/db";
import { Transaction } from "@/types/db";

const errStripeCustomerIdUpdateFailed = Error(
  "Failed to update stripe customer id"
);
const errUserPurchaseInsertFailed = Error("Failed to insert user purchase");

export const getUserBillingTokens = async (userId: string): Promise<number> => {
  const result = await db
    .select()
    .from(userBilling)
    .where(eq(userBilling.userId, userId));
  if (result.length !== 1) {
    return 0;
  }
  return result[0].tokens;
};

export const enterUserPurchaseDetailsDB = async (
  userId: string,
  stripeCustomerId: string,
  userPurchaseData: typeof userPurchase.$inferInsert
): Promise<void> => {
  await db.transaction(async (tx) => {
    try {
      await updateStripeCustomerIdTx(tx, userId, stripeCustomerId, userPurchaseData.tokensAdded);
      await insertUserPurchaseTx(tx, userPurchaseData);
    } catch (error: unknown) {
      tx.rollback();
      console.error(
        `Failed to enter user purchase details for user ${userId}`,
        error
      );
    }
  });
};

const updateStripeCustomerIdTx = async (
  tx: Transaction,
  userId: string,
  stripeCustomerId: string,
  tokensAdded: number
): Promise<void> => {
  // First get the current tokens count
  const currentBilling = await tx
    .select({ tokens: userBilling.tokens })
    .from(userBilling)
    .where(eq(userBilling.userId, userId));
  
  if (currentBilling.length !== 1) {
    console.error(`Failed to find user billing for user ${userId}`);
    throw errStripeCustomerIdUpdateFailed;
  }
  
  const currentTokens = currentBilling[0].tokens || 0;
  const newTokens = currentTokens + tokensAdded;
  
  const result = await tx
    .update(userBilling)
    .set({ 
      stripeCustomerId,
      tokens: newTokens,
      plan: 'pro',
    })
    .where(eq(userBilling.userId, userId));
  if (result.rowCount !== 1) {
    console.error(`Failed to update stripe customer id for user ${userId}`);
    throw errStripeCustomerIdUpdateFailed;
  }
};

const insertUserPurchaseTx = async (
  tx: Transaction,
  userPurchaseData: typeof userPurchase.$inferInsert
): Promise<void> => {
  const result = await tx.insert(userPurchase).values({
    ...userPurchaseData,
  });
  if (result.rowCount !== 1) {
    console.error(
      `Failed to insert user purchase for user ${userPurchaseData.userId}`,
      result
    );
    throw errUserPurchaseInsertFailed;
  }
};
