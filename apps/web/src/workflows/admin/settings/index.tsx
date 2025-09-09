import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { SystemSettingsFormInput } from "@cw/shared";
import { systemSettingsFormSchema } from "@cw/shared";

import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Slider } from "~/components/ui/slider";
import { Textarea } from "~/components/ui/textarea";
import { trpc } from "~/lib/trpc";

import { QuestionsForm } from "./questions";
import { MAX_VOICE_SPEED, MIN_VOICE_SPEED } from "./utils";
import { VoiceSelect } from "./voice";

export function AdminSettingsForm() {
	const { data: currentSettings } = useQuery(
		trpc.openaiVoice.getSystemSettings.queryOptions(),
	);

	const form = useForm<z.infer<typeof systemSettingsFormSchema>>({
		resolver: zodResolver(systemSettingsFormSchema),
		defaultValues: {
			voiceId: currentSettings?.voiceId ?? "",
			voiceSpeed: currentSettings?.voiceSpeed ?? 1,
			endingNote: currentSettings?.endingNote ?? "",
			eventInfo: currentSettings?.eventInfo ?? "",
			extraInstructions: currentSettings?.extraInstructions ?? "",
			welcomeNote: currentSettings?.welcomeNote ?? "",
			questions: currentSettings?.questions ?? defaultQuestions,
		},
	});

	const { mutate: updateSettings, isPending: isUpdateSettingsPending } =
		useMutation(trpc.admin.createSystemSettings.mutationOptions());

	useEffect(() => {
		if (currentSettings) {
			form.reset(currentSettings);
		}
	}, [currentSettings, form]);

	function onSubmit(values: SystemSettingsFormInput) {
		updateSettings(values);
	}

	return (
		<section>
			<h2 className="sr-only">System Settings</h2>
			<Form {...form}>
				<form
					className="grid grid-cols-1 gap-8 md:grid-cols-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<VoiceSelect formControl={form.control} />
					<FormField
						control={form.control}
						name="voiceSpeed"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Voice Speed</FormLabel>
								<FormControl>
									<Slider
										max={MAX_VOICE_SPEED}
										min={MIN_VOICE_SPEED}
										onValueChange={(value) => field.onChange(value[0])}
										step={0.05}
										value={[field.value]}
									/>
								</FormControl>
								<FormDescription>
									The speed of the voice. Current: {field.value}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="eventInfo"
						render={({ field }) => (
							<FormItem className="col-span-full">
								<FormLabel>Event Info</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="extraInstructions"
						render={({ field }) => (
							<FormItem className="col-span-full">
								<FormLabel>Extra Instructions</FormLabel>
								<FormControl>
									<Textarea {...field} value={field.value || ""} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="welcomeNote"
						render={({ field }) => (
							<FormItem className="col-span-full">
								<FormLabel>Welcome Message</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endingNote"
						render={({ field }) => (
							<FormItem className="col-span-full">
								<FormLabel>Ending Message</FormLabel>
								<FormControl>
									<Textarea {...field} value={field.value || ""} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<QuestionsForm formControl={form.control} />
					<Button
						className="col-span-full w-max place-self-end"
						disabled={isUpdateSettingsPending || !form.formState.isDirty}
						type="submit"
					>
						{isUpdateSettingsPending ? "Saving..." : "Save Settings"}
					</Button>
				</form>
			</Form>
		</section>
	);
}

const defaultQuestions = [{ content: "" }, { content: "" }, { content: "" }];
