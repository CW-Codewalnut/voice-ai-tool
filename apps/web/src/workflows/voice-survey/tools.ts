import type { RealtimeContextData } from "@openai/agents/realtime";
import { tool } from "@openai/agents/realtime";
import { z } from "zod";

import { TOOL_NAME_END_CONVERSATION } from "@cw/shared";

const argsSchema = z.object({});

export const endConversationTool = tool<typeof argsSchema, RealtimeContextData>(
	{
		name: TOOL_NAME_END_CONVERSATION,
		description: "Call this tool to end the voice session and disconnect.",
		parameters: argsSchema,
		needsApproval: true,
		execute: async () => {
			return ``;
		},
	},
);
