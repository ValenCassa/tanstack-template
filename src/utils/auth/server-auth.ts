import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db/db";
import {
  accounts,
  sessions,
  users,
  verifications,
} from "../db/schema/auth/schema";

export const serverAuth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      // 1 day in seconds
      maxAge: 86400,
    },
  },
  trustedOrigins: [process.env.VERCEL_URL ?? process.env.BETTER_AUTH_URL!],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
