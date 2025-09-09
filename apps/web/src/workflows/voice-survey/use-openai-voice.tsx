import type { RealtimeItem } from "@openai/agents/realtime";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useState } from "react";

import { OPENAI_DEFAULT_VOICE_MODEL } from "@cw/shared";

import { trpc } from "~/lib/trpc";

import type { SurveyState } from "./utils";
import { userMessagesOnBehalfOfSystem } from "./utils";

type UseOpenAIVoiceOptions = {
	shouldAgentInitiate: boolean;
};

export function useOpenAIVoice({ shouldAgentInitiate }: UseOpenAIVoiceOptions) {
	const sessionId = useMemo(() => {
		return nanoid(27);
	}, []);

	const [surveyState, setSurveyState] = useState<SurveyState>("idle");
	const [voiceClient, setVoiceClient] = useState<RealtimeSession | null>(null);

	const { data: systemSettings } = useQuery(
		trpc.openaiVoice.getSystemSettings.queryOptions(),
	);
	const { mutate: updateTranscript } = useMutation(
		trpc.openaiVoice.updateTranscript.mutationOptions(),
	);
	const { mutateAsync: getEphemeralKey } = useMutation(
		trpc.openaiVoice.getEphemeralKey.mutationOptions(),
	);

	const startSurvey = useCallback(async () => {
		if (!systemSettings) {
			return;
		}

		try {
			const openAIAccessToken = await getEphemeralKey();

			setSurveyState("initializing");

			const voiceAgent = new RealtimeAgent({
				name: "Survey Assistant",
				instructions: `${systemSettings.systemPrompt}`,
			});

			const voiceAgentSession = new RealtimeSession(voiceAgent, {
				model: OPENAI_DEFAULT_VOICE_MODEL,
				config: {
					voice: systemSettings.voiceId,
					speed: systemSettings.voiceSpeed,
					inputAudioTranscription: {
						model: "whisper-1",
					},
				},
			});

			setVoiceClient(voiceAgentSession);

			await voiceAgentSession.connect({
				apiKey: openAIAccessToken,
			});

			setSurveyState("listening");

			if (shouldAgentInitiate) {
				voiceAgentSession.sendMessage({
					role: "user",
					type: "message",
					content: [
						{
							text: userMessagesOnBehalfOfSystem.agentInitiate,
							type: "input_text",
						},
					],
				});
			}
		} catch (error) {
			console.log(error);
			setSurveyState("error");
		}
	}, [shouldAgentInitiate, systemSettings, getEphemeralKey]);

	const pauseConversation = useCallback(() => {
		if (voiceClient && surveyState !== "paused") {
			try {
				voiceClient.interrupt();
				voiceClient.mute(true);
				setSurveyState("paused");
			} catch (error) {
				console.log("Error pausing conversation:", error);
			}
		}
	}, [voiceClient, surveyState]);

	const resumeConversation = useCallback(() => {
		if (voiceClient && surveyState === "paused") {
			try {
				voiceClient.mute(false);
				setSurveyState("listening");

				voiceClient.sendMessage({
					role: "user",
					type: "message",
					content: [
						{
							text: userMessagesOnBehalfOfSystem.resumeConversation,
							type: "input_text",
						},
					],
				});
			} catch (error) {
				console.log("Error resuming conversation:", error);
			}
		}
	}, [voiceClient, surveyState]);

	const handlePauseResumeCall = useCallback(() => {
		if (surveyState === "listening") {
			pauseConversation();
		} else {
			resumeConversation();
		}
	}, [surveyState, pauseConversation, resumeConversation]);

	const handleEndCall = useCallback(() => {
		try {
			voiceClient?.close();
			setSurveyState("completed");
		} catch (error) {
			console.log("Error ending call:", error);
		}
	}, [voiceClient]);

	useEffect(() => {
		if (surveyState !== "listening" || !voiceClient) {
			return;
		}

		function handleError(error: unknown) {
			voiceClient?.close();
			setSurveyState("error");
			console.log("Voice client error:", error);
		}

		function handleHistoryUpdated(history: RealtimeItem[]) {
			// updateTranscript({
			// 	sessionId,
			// 	content: history,
			// });
		}

		voiceClient.on("error", handleError);
		voiceClient.on("history_updated", handleHistoryUpdated);

		return () => {
			voiceClient.off("error", handleError);
			voiceClient.off("history_updated", handleHistoryUpdated);
		};
	}, [surveyState, voiceClient, sessionId, updateTranscript]);

	useEffect(() => {
		return () => {
			if (voiceClient) {
				try {
					voiceClient?.close();
					setVoiceClient(null);
					setSurveyState("completed");
				} catch (error) {
					console.log("Error closing voice client:", error);
				}
			}
		};
	}, [voiceClient]);

	return {
		surveyState,
		startSurvey,
		handleEndCall,
		handlePauseResumeCall,
	};
}
