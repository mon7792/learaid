import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/config/db";
import { tryCatch } from "@/utils/error";
import { createUserBilling } from "@/features/auth/model";
import { redisClient as redis } from "@/config/cache";

export const auth = betterAuth({
  appName: process.env.APP_NAME as string,
  baseURL: process.env.APP_BASE_URL as string,
  trustedOrigins: (process.env.APP_TRUSTED_ORIGIN as string).split(","),
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
            console.error(
              `error: creating trial for user ${user.id}: ${result.error}`
            );
          }
        },
      },
    },
  },
  secondaryStorage: {
    get: async (key) => {
			const value = await redis.get(key);
			return value ? value : null;
		},
		set: async (key, value, ttl) => {
			if (ttl) await redis.set(key, value, { EX: ttl });
			else await redis.set(key, value);
		},
		delete: async (key) => {
			await redis.del(key);
		}
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
    storage: "secondary-storage",
  },
});
