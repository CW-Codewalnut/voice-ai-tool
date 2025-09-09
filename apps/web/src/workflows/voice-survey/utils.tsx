import {
	AlertCircleIcon,
	CheckCircle2Icon,
	ClockIcon,
	Loader2Icon,
	PauseIcon,
} from "lucide-react";

export type SurveyState =
	| "idle"
	| "initializing"
	| "listening"
	| "paused"
	| "completed"
	| "error";

export const userMessagesOnBehalfOfSystem = {
	agentInitiate: "Begin the conversation (System prompt)",
	resumeConversation: "Please continue the conversation (System Prompt)",
} as const;

type StateConfig = {
	icon: React.ReactNode;
	title: string;
	description: string;
	bgColor: string;
	borderColor: string;
};

const bars = Array.from({ length: 5 }, (_, i) => i);

export const surveyStateConfig = {
	idle: {
		icon: <ClockIcon className="size-12 text-muted-foreground" />,
		title: "Ready to Start",
		description: "Click the button below to begin your survey",
		bgColor: "bg-card",
		borderColor: "border-border",
	},

	initializing: {
		icon: <Loader2Icon className="size-12 animate-spin text-primary" />,
		title: "Initializing",
		description: "Please wait while we prepare your voice assistant",
		bgColor: "bg-primary/5",
		borderColor: "border-primary",
	},

	listening: {
		icon: (
			<div className="flex h-12 items-center justify-center gap-1">
				{bars.map((i) => (
					<div
						className={`w-2 rounded-full bg-accent-foreground animate-wave-delay-${i} h-8`}
						key={i}
					/>
				))}
			</div>
		),
		title: "Listening",
		description: "We're actively listening to your feedback",
		bgColor: "bg-accent/5",
		borderColor: "border-accent",
	},

	paused: {
		icon: <PauseIcon className="size-12 text-orange-500" />,
		title: "Paused",
		description: "Voice feedback session is paused",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
	},

	error: {
		icon: <AlertCircleIcon className="size-12 text-destructive" />,
		title: "Error",
		description: "Something went wrong. Please try again.",
		bgColor: "bg-destructive/5",
		borderColor: "border-destructive",
	},

	completed: {
		icon: <CheckCircle2Icon className="size-12 text-green-600" />,
		title: "Thank You for Submission",
		description: "Your feedback has been successfully recorded",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
	},
} satisfies Record<SurveyState, StateConfig>;
