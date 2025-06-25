import { ulid } from "ulidx";
import { eq } from "drizzle-orm";

import { db } from "@/config/db";

import { userBilling } from "@/schema";

// create user billing on signup
export const createUserBilling = async (userID: string) => {
  const newUserBilling: typeof userBilling.$inferInsert = {
    id: ulid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userID,
    plan: "base",
    tokens: 1000,
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