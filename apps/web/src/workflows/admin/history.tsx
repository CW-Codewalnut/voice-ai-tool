import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { trpc } from "~/lib/trpc";

export function TranscriptsHistory() {
	const { data: history } = useQuery(
		trpc.admin.getAllTranscripts.queryOptions(),
	);

	return (
		<section>
			<h2 className="sr-only">Transcripts</h2>
			<ul className="flex flex-col gap-4">
				{history?.map?.((item) => (
					<li key={item.id}>
						<Card>
							<CardHeader>
								<CardTitle>
									Session at&nbsp;
									{format(item.createdAt, DATE_FORMAT)}
								</CardTitle>
								<CardContent className="mt-4 p-0">
									<ul className="flex flex-col gap-2">
										{item.content?.map((item) => (
											<li key={item.itemId}>
												{item.type === "message" ? (
													<>
														<span className="font-bold text-foreground capitalize">
															{item.role}:{" "}
														</span>
														{item.content.map((i) => {
															if (i.type === "input_text") {
																return i.text;
															}

															if (
																i.type === "output_audio" ||
																i.type === "input_audio"
															) {
																return i.transcript;
															}

															return null;
														})}
													</>
												) : null}
											</li>
										))}
									</ul>
								</CardContent>
							</CardHeader>
						</Card>
					</li>
				))}
			</ul>
		</section>
	);
}

const DATE_FORMAT = "MMM d, yyyy hh:mm a";
