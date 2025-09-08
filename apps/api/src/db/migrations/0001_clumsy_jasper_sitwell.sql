CREATE TABLE `system_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer NOT NULL,
	`voiceId` text NOT NULL,
	`systemPrompt` text NOT NULL,
	`voiceSpeed` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transcript` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer NOT NULL,
	`sessionId` text NOT NULL,
	`content` text
);
