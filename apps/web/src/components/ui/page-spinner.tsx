import { LoaderIcon } from "lucide-react";

import { PageCenter } from "~/components/ui/page-center";

export function PageSpinner({ className = "" }) {
	return (
		<PageCenter className={className}>
			<LoaderIcon className="animate-spin" />
		</PageCenter>
	);
}
