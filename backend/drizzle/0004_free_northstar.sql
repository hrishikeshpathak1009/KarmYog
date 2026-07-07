ALTER TABLE "habit_logs" ADD COLUMN "completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "habit_logs" ADD COLUMN "skipped" boolean DEFAULT false NOT NULL;