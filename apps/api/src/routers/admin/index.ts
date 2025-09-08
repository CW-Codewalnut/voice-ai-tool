import { desc } from "drizzle-orm";

import { systemSettingsFormSchema } from "@cw/shared";

import { db } from "../../db";
import { systemSettings, transcript } from "../../db/schema";
import { protectedProcedure, router } from "../../lib/trpc";

export const adminRouter = router({
	getSystemSettings: protectedProcedure.query(async () => {
		const results = await db.select().from(systemSettings);
		return results.at(0) ?? null;
	}),

	getAllTranscripts: protectedProcedure.query(async () => {
		return await db
			.select()
			.from(transcript)
			.orderBy(desc(transcript.createdAt));
	}),

	createSystemSettings: protectedProcedure
		.input(systemSettingsFormSchema)
		.mutation(async ({ input }) => {
			await db.delete(systemSettings);
			const results = await db.insert(systemSettings).values({
				...input,
				systemPrompt: "",
			});

			return results.rowsAffected;
		}),
});
