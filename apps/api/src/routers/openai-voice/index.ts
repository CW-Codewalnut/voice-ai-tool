import type { RealtimeItem } from "@openai/agents/realtime";
import { eq } from "drizzle-orm";
import OpenAI from "openai";
import z from "zod";

import { OPENAI_DEFAULT_VOICE_MODEL } from "@cw/shared";

import { db } from "../../db";
import { systemSettings, transcript } from "../../db/schema";
import { ENV } from "../../lib/env";
import { publicProcedure, router } from "../../lib/trpc";

const openai = new OpenAI({
	apiKey: ENV.OPENAI_API_KEY,
});

export const openaiVoiceRouter = router({
	getEphemeralKey: publicProcedure.mutation(async () => {
		const result = await openai.realtime.clientSecrets.create({
			session: {
				type: "realtime",
				model: OPENAI_DEFAULT_VOICE_MODEL,
			},
		});

		return result.value;
	}),

	getSystemSettings: publicProcedure.query(async () => {
		const results = await db.select().from(systemSettings);
		return results.at(0) ?? null;
	}),

	updateTranscript: publicProcedure
		.input(
			z.object({
				sessionId: z.string(),
				content: z.custom<RealtimeItem[]>((data) => Array.isArray(data)),
			}),
		)
		.mutation(async ({ input }) => {
			const { sessionId, content } = input;

			const sessions = await db
				.select()
				.from(transcript)
				.where(eq(transcript.sessionId, sessionId))
				.limit(1);

			const session = sessions.at(0);

			if (session) {
				await db
					.update(transcript)
					.set({ content })
					.where(eq(transcript.id, session.id));
			} else {
				await db.insert(transcript).values({
					sessionId,
					content,
				});
			}

			return {
				success: true,
			};
		}),
});
