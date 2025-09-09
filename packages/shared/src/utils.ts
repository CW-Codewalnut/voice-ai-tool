import { z } from "zod";

const zodString = z.string().min(1);
const zodNullableString = zodString.nullable().default(null);

export const systemSettingsFormSchema = z.object({
	voiceId: z.string(),
	voiceSpeed: z.number(),
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
