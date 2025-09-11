import {
	PauseIcon,
	PhoneOffIcon,
	PlayIcon,
	RefreshCcwIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import { useOpenAIVoice } from "./use-openai-voice";
import { surveyStateConfig } from "./utils";

export function VoiceSurvey() {
	const [shouldAgentInitiate, _setShouldAgentInitiate] = useState(true);

	const {
		surveyState,
		startSurvey,
		handleEndCall,
		handleRestartCall,
		handlePauseResumeCall,
	} = useOpenAIVoice({
		shouldAgentInitiate,
	});

	const voiceClientState = surveyStateConfig[surveyState];

	return (
		<main className="mx-auto flex h-[80svh] w-full max-w-2xl flex-col gap-8 p-4">
			<h2 className="text-center font-bold text-2xl">
				Voice Based Survey Tool
			</h2>
			<div className="flex flex-1 flex-col justify-center">
				<Card
					className={`${voiceClientState.bgColor} h-72 max-h-72 border-2 ${voiceClientState.borderColor} transition-all duration-300`}
				>
					<CardContent className="space-y-6 p-12 text-center">
						<div className="flex justify-center">{voiceClientState.icon}</div>
						<div className="space-y-2">
							<h2 className="font-semibold text-2xl text-card-foreground">
								{voiceClientState.title}
							</h2>
							<p className="text-balance text-muted-foreground">
								{voiceClientState.description}
							</p>
						</div>
					</CardContent>
				</Card>
				<div className="mt-6 flex justify-center gap-4">
					{surveyState === "idle" ? (
						<Button onClick={startSurvey} size="lg">
							<PlayIcon />
							Start Survey
						</Button>
					) : surveyState === "listening" || surveyState === "paused" ? (
						<>
							<Button
								onClick={handlePauseResumeCall}
								size="lg"
								variant="outline"
							>
								{surveyState === "paused" ? (
									<>
										<PlayIcon />
										Resume
									</>
								) : (
									<>
										<PauseIcon />
										Pause
									</>
								)}
							</Button>
							<Button onClick={handleEndCall} size="lg" variant="destructive">
								<PhoneOffIcon />
								End Call
							</Button>
						</>
					) : surveyState === "completed" ? (
						<Button onClick={handleRestartCall} size="lg">
							<RefreshCcwIcon />
							Restart Call
						</Button>
					) : (
						<div aria-hidden className="size-10 opacity-0" />
					)}
				</div>
			</div>
		</main>
	);
}
