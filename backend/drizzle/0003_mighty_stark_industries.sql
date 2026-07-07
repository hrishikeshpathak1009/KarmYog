CREATE TYPE "public"."habit_type" AS ENUM('progress', 'completion');--> statement-breakpoint
ALTER TABLE "habits" ADD COLUMN "type" "habit_type" DEFAULT 'progress' NOT NULL;