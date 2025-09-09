import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { commonTableCols } from "./utils";

export const systemSettings = sqliteTable("system_settings", {
	...commonTableCols,
	voiceId: text().notNull(),
	voiceSpeed: integer({ mode: "number" }).notNull(),
	eventInfo: text().notNull(),
	extraInfo: text(),
	welcomeNote: text().notNull(),
	endingNote: text(),
	questions: text({ mode: "json" }).$type<{ content: string }[]>().notNull(),
	systemPrompt: text().notNull(),
});
