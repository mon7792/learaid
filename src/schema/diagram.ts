import {
  pgTable,
  text,
  varchar,
  integer,
  json,
  timestamp,
  char,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { user } from "./auth";

export const roleEnum = pgEnum("role", ["user", "ai"]);

// diagram table
export const diagram = pgTable("diagram", {
  id: char("id", { length: 26 }).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  title: varchar("title", { length: 100 }).default(""),
  tokensUsed: integer("tokens_used").notNull().default(0),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
}, (t) => [
  index("idx_diagram_user_id").on(t.userId),
  index("idx_diagram_created_at").on(t.createdAt),
  index("idx_diagram_user_created").on(t.userId, t.createdAt),
]);

// diagram messages table
export const diagramMessages = pgTable("diagram_messages", {
  id: char("id", { length: 26 }).primaryKey(),
  diagramId: char("diagram_id", { length: 26 })
    .notNull()
    .references(() => diagram.id),
  role: roleEnum("role").notNull().default("user"),
  message: json("message").notNull(),
  mermaid: text("mermaid"),
  excalidraw: json("excalidraw"),
  tokenCost: integer("token_cost").notNull().default(0),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
}, (t) => [
  index("idx_diagram_messages_diagram_id").on(t.diagramId),
  index("idx_diagram_messages_created_at").on(t.createdAt),
  index("idx_diagram_messages_diagram_created").on(t.diagramId, t.createdAt),
]);
