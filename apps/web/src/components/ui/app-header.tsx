import { MenuIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

import { CodeWalnutIcon } from "~/components/icons/codewalnut";
import { useAuth } from "~/hooks/use-auth";

import { Button } from "./button";
import { useSidebar } from "./sidebar";

export function AppHeader() {
	return (
		<header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-lg">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
				<Link to="/">
					<CodeWalnutIcon className="scale-85" />
				</Link>
				<SidebarTrigger />
			</div>
		</header>
	);
}

function SidebarTrigger() {
	const { pathname } = useLocation();
	const { data: authData } = useAuth();
	const { setOpenMobile, isMobile, toggleSidebar, open } = useSidebar();

	// biome-ignore lint/correctness/useExhaustiveDependencies: need pathname in the dep arr tor trigger
	useEffect(() => {
		if (isMobile && open) {
			setOpenMobile(false);
		}
	}, [isMobile, setOpenMobile, pathname, open]);

	if (!authData) {
		return null;
	}

	return (
		<Button onClick={toggleSidebar} variant="outline">
			<MenuIcon />
		</Button>
	);
}
