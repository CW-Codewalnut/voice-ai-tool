import { ExternalLinkIcon } from "lucide-react";

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

import type { SettingsFormElemProps } from "./utils";
import { VOICES } from "./utils";

export function VoiceSelect({ formControl }: SettingsFormElemProps) {
	return (
		<FormField
			control={formControl}
			name="voiceId"
			render={({ field }) => (
				<FormItem>
					<div className="flex justify-between">
						<FormLabel>Voice</FormLabel>
						<a
							className="inline-flex items-center gap-1 text-sm underline"
							href="https://openai.fm"
							rel="noopener noreferrer"
							target="_blank"
						>
							Listen to voices <ExternalLinkIcon className="size-3.5" />
						</a>
					</div>
					<Select
						key={`${field.value}-${field.name}`}
						onValueChange={field.onChange}
						value={field.value}
					>
						<FormControl>
							<SelectTrigger className="w-full capitalize">
								<SelectValue placeholder="Select a voice" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{VOICES.map((voice) => (
								<SelectItem className="capitalize" key={voice} value={voice}>
									{voice}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormDescription>
						The voice to use for the text-to-speech conversion.
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
