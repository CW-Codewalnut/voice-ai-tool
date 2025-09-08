import { z } from "zod";

const zodString = z.string().min(1);

export const systemSettingsFormSchema = z.object({
	voiceId: z.string(),
	voiceSpeed: z.number(),
	welcomeMessage: zodString,
	questions: z
		.array(
			z.object({
				content: zodString,
			}),
		)
		.min(1),
});

export type SystemSettingsFormInput = z.infer<typeof systemSettingsFormSchema>;
