import { betterAuth } from "better-auth";
import { supabaseAdapter } from "better-auth/adapters/supabase";

export const auth = betterAuth({
  database: supabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secretKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {},
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;