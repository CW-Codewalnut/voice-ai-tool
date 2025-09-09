import { AppHeader } from "~/components/ui/app-header";
import { ErrorBoundary } from "~/components/ui/error-boundary";
import { VoiceSurvey } from "~/workflows/voice-survey";

export default function HomeRoute() {
	return (
		<>
			<AppHeader />
			<ErrorBoundary>
				<VoiceSurvey />
			</ErrorBoundary>
		</>
	);
}
