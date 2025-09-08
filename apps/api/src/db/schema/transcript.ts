import type { RealtimeItem } from "@openai/agents/realtime";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { commonTableCols } from "./utils";

export const transcript = sqliteTable("transcript", {
	...commonTableCols,
	sessionId: text().notNull(),
	content: text({ mode: "json" }).$type<RealtimeItem[]>(),
});
