CREATE TYPE "public"."role" AS ENUM('user', 'ai');--> statement-breakpoint
CREATE TABLE "diagram" (
	"id" char(26) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" varchar(100) DEFAULT '',
	"tokens_used" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diagram_messages" (
	"id" char(26) PRIMARY KEY NOT NULL,
	"diagram_id" char(26) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"message" json NOT NULL,
	"mermaid" text,
	"excalidraw" json,
	"token_cost" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "diagram" ADD CONSTRAINT "diagram_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagram_messages" ADD CONSTRAINT "diagram_messages_diagram_id_diagram_id_fk" FOREIGN KEY ("diagram_id") REFERENCES "public"."diagram"("id") ON DELETE no action ON UPDATE no action;