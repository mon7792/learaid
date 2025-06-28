import { ulid } from "ulidx";
import { eq, sql } from "drizzle-orm";

import { db } from "@/config/db";

import { userBilling } from "@/schema";
import { Transaction } from "@/types/db";

const errUserBillingUpdate = Error("err: db: failed to update user billing tokens");
const errUserBillingNotFound = Error("err: db: user billing not found");

// create user billing on signup
export const createUserBilling = async (userID: string) => {
  const newUserBilling: typeof userBilling.$inferInsert = {
    id: ulid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userID,
    plan: "base",
    tokens: 4999,
    stripeCustomerId: null,
    lastBilledAt: null,
  };
  const result = await db.insert(userBilling).values(newUserBilling);
  return result;
};


export const getUserBilling = async (userId: string): Promise<typeof userBilling.$inferSelect | null> => {
  const result = await db.select().from(userBilling).where(eq(userBilling.userId, userId));
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

export const updateUserBillingTokenTx = async (
  tx: Transaction,
  userId: string,
  tokenCost: number
): Promise<void> => {
  // First, lock the row with SELECT FOR UPDATE to prevent race conditions
  const lockedUserBilling = await tx
    .select({
      id: userBilling.id,
      tokens: userBilling.tokens,
    })
    .from(userBilling)
    .where(eq(userBilling.userId, userId))
    .for("update")
    .limit(1);

  if (lockedUserBilling.length === 0) {
    throw errUserBillingNotFound;
  }

  // Check if user has enough tokens
  // if (lockedUserBilling[0].tokens < tokenCost) {
  //   throw Error("err: insufficient tokens");
  // }

  // Update the tokens by subtracting the token cost
  const result = await tx
    .update(userBilling)
    .set({
      tokens: sql`${userBilling.tokens} - ${tokenCost}`,
    })
    .where(eq(userBilling.userId, userId));

  if (!result.rowCount || result.rowCount !== 1) {
    throw errUserBillingUpdate;
  }
};