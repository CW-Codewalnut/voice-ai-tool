import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { AppHeader } from "~/components/ui/app-header";
import { PageCenter } from "~/components/ui/page-center";
import { PageSpinner } from "~/components/ui/page-spinner";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { authClient } from "~/lib/auth";
import { ROUTE_HOME, ROUTE_LOGIN } from "~/lib/constants";

import { Login } from "./login";
import { AdminSidebar } from "./sidebar";

export function AdminLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isPending, data } = authClient.useSession();

	useEffect(() => {
		if (isPending) {
			return;
		}

		if (!data) {
			navigate(ROUTE_LOGIN, {
				replace: true,
			});
		}

		if (data && location.pathname === ROUTE_LOGIN) {
			navigate(ROUTE_HOME, {
				replace: true,
			});
		}
	}, [data, isPending, navigate, location.pathname]);

	if (isPending) {
		return <PageSpinner />;
	}

	if (!data) {
		return (
			<PageCenter>
				<Login />
			</PageCenter>
		);
	}

	if (data) {
		return (
			<SidebarProvider>
				<AdminSidebar />
				<SidebarInset>
					<AppHeader />
					<div className="mx-auto w-full max-w-7xl p-4">
						<Outlet context={data} />
					</div>
				</SidebarInset>
			</SidebarProvider>
		);
	}
}
