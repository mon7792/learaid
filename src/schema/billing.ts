import {
  boolean,
  char,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { user } from "./auth";

/**
 * ref: https://www.pedroalonso.net/blog/implementing-pre-paid-usage-billing-with-nextjs-and-stripe/
 * */

// subscription
export const planEnum = pgEnum("plan", ["base", "pro"]);
export const statusEnum = pgEnum("status", ["PENDING", "COMPLETED", "FAILED"]);

// user_billing
export const userBilling = pgTable(
  "user_billing",
  {
    id: char("id", { length: 26 }).primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    tokens: integer("tokens").notNull().default(0),
    stripeCustomerId: text("stripe_customer_id"),
    plan: planEnum("plan").notNull().default("base"),
    lastBilledAt: timestamp("last_billed_at"),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (t) => [index("idx_user_billing_user_id").on(t.userId)]
);

export const userUsage = pgTable(
  "user_usage",
  {
    id: char("id", { length: 26 }).primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
    reason: json("reason"),
    timestamp: timestamp("timestamp")
      .notNull()
      .default(sql`now()`),
    success: boolean("success").notNull(),
    error: json("error"),
  },
  (t) => [index("idx_user_usage_user_id").on(t.userId)]
);

export const userPurchase = pgTable(
  "user_purchase",
  {
    id: char("id", { length: 26 }).primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    tokensAdded: integer("tokens_added").notNull(),
    pricePaid: integer("price_paid").notNull(),
    currency: text("currency").notNull().default("eur"),
    stripeCheckoutSessionId: text("stripe_checkout_session_id")
      .notNull()
      .unique(),
    stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
    status: statusEnum("status").notNull().default("PENDING"),
    timestamp: timestamp("timestamp")
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`now()`),
  },
  (t) => [index("idx_user_purchase_user_id").on(t.userId)]
);
