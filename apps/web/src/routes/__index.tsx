import { AppHeader } from "~/components/ui/app-header";

export default function HomeRoute() {
	return (
		<>
			<AppHeader />
			<main className="mx-auto max-w-7xl p-4">
				<h1 className="font-bold text-2xl">Home</h1>
			</main>
		</>
	);
}
