CREATE TYPE "public"."karm_kind" AS ENUM('habit', 'task');--> statement-breakpoint
ALTER TABLE "habits" ADD COLUMN "kind" "karm_kind" DEFAULT 'habit' NOT NULL;--> statement-breakpoint
ALTER TABLE "habits" ADD COLUMN "due_date" timestamp;