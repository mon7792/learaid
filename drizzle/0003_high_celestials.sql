CREATE INDEX "idx_account_user_id" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_session_user_id" ON "session" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_user_billing_user_id" ON "user_billing" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_user_purchase_user_id" ON "user_purchase" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_user_usage_user_id" ON "user_usage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_diagram_user_id" ON "diagram" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_diagram_created_at" ON "diagram" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_diagram_user_created" ON "diagram" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_diagram_messages_diagram_id" ON "diagram_messages" USING btree ("diagram_id");--> statement-breakpoint
CREATE INDEX "idx_diagram_messages_created_at" ON "diagram_messages" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_diagram_messages_diagram_created" ON "diagram_messages" USING btree ("diagram_id","created_at");