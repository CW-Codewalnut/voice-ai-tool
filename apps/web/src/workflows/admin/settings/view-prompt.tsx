import type { SystemSettingsFormInput } from "@cw/shared";

import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

type ViewPromptProps = {
	questions: SystemSettingsFormInput["questions"];
};

export function ViewPrompt(_: ViewPromptProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="h-max p-0" variant="link">
					View Prompt
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>System Prompt</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
