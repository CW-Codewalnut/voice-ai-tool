import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { commonTableCols } from "./utils";

export const systemSettings = sqliteTable("system_settings", {
	...commonTableCols,
	voiceId: text().notNull(),
	systemPrompt: text().notNull(),
	voiceSpeed: integer({ mode: "number" }).notNull(),
});
