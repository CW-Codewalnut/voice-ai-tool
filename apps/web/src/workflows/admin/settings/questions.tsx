import { XIcon } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

import type { SettingsFormElemProps } from "./utils";
import { ViewPrompt } from "./view-prompt";

export function QuestionsForm({ formControl }: SettingsFormElemProps) {
	const { fields, append, remove } = useFieldArray({
		name: "questions",
		control: formControl,
	});

	return (
		<div className="col-span-full flex flex-col gap-4">
			{fields.map((field, index) => (
				<div className="flex w-full items-end gap-2" key={field.id}>
					<FormField
						control={formControl}
						name={`questions.${index}.content`}
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Question {index + 1}</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={index === 0}
						onClick={() => remove(index)}
						size="icon"
						type="button"
						variant="ghost"
					>
						<XIcon />
					</Button>
				</div>
			))}
			<div className="flex items-center justify-between gap-4">
				<ViewPrompt questions={fields} />
				<Button
					className="mt-2 w-max self-end"
					onClick={() => append({ content: "" })}
					type="button"
					variant="outline"
				>
					Add Question
				</Button>
			</div>
		</div>
	);
}
