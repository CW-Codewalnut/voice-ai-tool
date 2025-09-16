import { z } from "zod";

const zodString = z.string().min(1);
const zodNullableString = zodString.nullish();

export const MIN_VOICE_SPEED = 0.25;
export const MAX_VOICE_SPEED = 1.5;

export const systemSettingsFormSchema = z.object({
	voiceId: z.string(),
	voiceSpeed: z.number().min(MIN_VOICE_SPEED).max(MAX_VOICE_SPEED),
	eventInfo: zodString,
	extraInstructions: zodNullableString,
	welcomeNote: zodString,
	endingNote: zodNullableString,
	questions: z
		.array(
			z.object({
				content: zodString,
			}),
		)
		.min(1),
});

export type SystemSettingsFormInput = z.infer<typeof systemSettingsFormSchema>;

export const OPENAI_DEFAULT_VOICE_MODEL = "gpt-4o-realtime-preview-2025-06-03";

export const TOOL_NAME_END_CONVERSATION = "end_conversation";
