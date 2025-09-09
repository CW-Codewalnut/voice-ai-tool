import { router } from "../lib/trpc";
import { adminRouter } from "./admin";
import { openaiVoiceRouter } from "./openai-voice";

export const appRouter = router({
	admin: adminRouter,
	openaiVoice: openaiVoiceRouter,
});
