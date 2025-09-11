import { Link } from "react-router";

import { CodeWalnutIcon } from "~/components/icons/codewalnut";

export function AppHeader() {
	return (
		<header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-lg">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
				<Link to="/">
					<CodeWalnutIcon className="scale-85" />
				</Link>
			</div>
		</header>
	);
}
