import { eq } from "drizzle-orm";

import { userBilling } from "@/schema";
import { db } from "@/config/db";

export const getUserBillingTokens = async (userId: string): Promise<number> => {
  const result = await db.select().from(userBilling).where(eq(userBilling.userId, userId));
  if (result.length !== 1) {
    return 0;
  }
  return result[0].tokens;
};
