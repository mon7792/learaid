import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/config/db";
import { tryCatch } from "@/utils/error";
import { createUserBilling } from "@/features/auth/model";

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}/api/auth/callback/github`,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [nextCookies()],
  databaseHooks: {
    user: {
        create: {
            after: async (user) => {
                const result = await tryCatch(createUserBilling(user.id));
                if (result.error) {
                    console.error(`error: creating trial for user ${user.id}: ${result.error}`);
                }
            },
        },
    },
},
});
