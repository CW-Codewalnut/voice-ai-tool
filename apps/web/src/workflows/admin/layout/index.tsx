import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { AppHeader } from "~/components/ui/app-header";
import { PageCenter } from "~/components/ui/page-center";
import { PageSpinner } from "~/components/ui/page-spinner";
import { SidebarInset } from "~/components/ui/sidebar";
import { useAuth } from "~/hooks/use-auth";
import { ROUTE_HOME, ROUTE_LOGIN } from "~/lib/constants";

import { Login } from "./login";

export function AdminLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const { data: authData, isPending: isAuthLoading } = useAuth();

	useEffect(() => {
		if (isAuthLoading) {
			return;
		}

		if (!authData) {
			navigate(ROUTE_LOGIN, {
				replace: true,
			});
		}

		if (authData && location.pathname === ROUTE_LOGIN) {
			navigate(ROUTE_HOME, {
				replace: true,
			});
		}
	}, [authData, isAuthLoading, navigate, location.pathname]);

	if (isAuthLoading) {
		return <PageSpinner />;
	}

	if (!authData) {
		return (
			<PageCenter>
				<Login />
			</PageCenter>
		);
	}

	if (authData) {
		return (
			<SidebarInset>
				<AppHeader />
				<div className="mx-auto w-full max-w-7xl p-4">
					<Outlet context={authData} />
				</div>
			</SidebarInset>
		);
	}
}
