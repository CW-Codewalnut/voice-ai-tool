import type { RealtimeItem, TransportEvent } from "@openai/agents/realtime";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState } from "react";

import { OPENAI_DEFAULT_VOICE_MODEL } from "@cw/shared";

import { trpc } from "~/lib/trpc";

import { endConversationTool } from "./tools";
import type { SurveyState } from "./utils";

type UseOpenAIVoiceOptions = {
	shouldAgentInitiate: boolean;
};

type VoiceClient = RealtimeSession<{
	history: RealtimeItem[];
}>;

function generateSessionId() {
	return nanoid(27);
}

const MIN_HISTORY_THRESHOLD = 1;
const END_TOOL_CALLED_TIMEOUT = 1000;

export function useOpenAIVoice({ shouldAgentInitiate }: UseOpenAIVoiceOptions) {
	const endToolCalledRef = useRef(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [sessionId, setSessionId] = useState(generateSessionId);
	const [surveyState, setSurveyState] = useState<SurveyState>("idle");
	const [voiceClient, setVoiceClient] = useState<VoiceClient | null>(null);

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
			setSurveyState("initializing");
			const openAIAccessToken = await getEphemeralKey();

			const voiceAgent = new RealtimeAgent({
				name: "Survey Assistant",
				instructions: systemSettings.systemPrompt,
				tools: [endConversationTool],
			});

			const voiceAgentSession = new RealtimeSession(voiceAgent, {
				model: OPENAI_DEFAULT_VOICE_MODEL,
				config: {
					audio: {
						output: {
							voice: systemSettings.voiceId,
							speed: systemSettings.voiceSpeed,
						},
						input: {
							transcription: {
								model: "whisper-1",
							},
						},
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
			voiceClient.interrupt();
			voiceClient.mute(true);
			setSurveyState("paused");
		}
	}, [voiceClient, surveyState]);

	const resumeConversation = useCallback(() => {
		if (voiceClient && surveyState === "paused") {
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
		}
	}, [voiceClient, surveyState]);

	const handlePauseResumeCall = useCallback(() => {
		if (surveyState === "listening") {
			pauseConversation();
		} else if (surveyState === "paused") {
			resumeConversation();
		}
	}, [surveyState, pauseConversation, resumeConversation]);

	const handleEndCall = useCallback(() => {
		voiceClient?.close();
		setVoiceClient(null);
		setSurveyState("completed");
	}, [voiceClient]);

	const handleRestartCall = useCallback(() => {
		setSessionId(generateSessionId());
		endToolCalledRef.current = false;
		setVoiceClient(null);
		startSurvey();
	}, [startSurvey]);

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
			if (history.length > MIN_HISTORY_THRESHOLD) {
				updateTranscript({
					sessionId,
					content: history,
				});
			}
		}

		function handleToolApprovalRequested() {
			endToolCalledRef.current = true;
		}

		function handleTransportEvent(event: TransportEvent) {
			if (
				event.type === "output_audio_buffer.stopped" &&
				endToolCalledRef.current
			) {
				timeoutRef.current = setTimeout(() => {
					voiceClient?.close();
					setVoiceClient(null);
					setSurveyState("completed");
				}, END_TOOL_CALLED_TIMEOUT);
			}
		}

		voiceClient.on("error", handleError);
		voiceClient.on("history_updated", handleHistoryUpdated);
		voiceClient.on("tool_approval_requested", handleToolApprovalRequested);
		voiceClient.on("transport_event", handleTransportEvent);

		return () => {
			voiceClient.off("error", handleError);
			voiceClient.off("history_updated", handleHistoryUpdated);
			voiceClient.off("tool_approval_requested", handleToolApprovalRequested);
			voiceClient.off("transport_event", handleTransportEvent);
		};
	}, [surveyState, voiceClient, updateTranscript, sessionId]);

	useEffect(() => {
		return () => {
			if (voiceClient) {
				voiceClient?.close();
				setVoiceClient(null);
				setSurveyState("completed");
			}

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [voiceClient]);

	return {
		surveyState,
		startSurvey,
		handleEndCall,
		handleRestartCall,
		handlePauseResumeCall,
	};
}

const userMessagesOnBehalfOfSystem = {
	agentInitiate: "Begin the conversation (System prompt)",
	resumeConversation: "Please continue the conversation (System Prompt)",
} as const;
