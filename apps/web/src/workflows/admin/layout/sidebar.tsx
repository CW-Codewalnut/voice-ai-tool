import { BarChart3Icon, SettingsIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "~/components/ui/sidebar";
import { ROUTE_RESULTS, ROUTE_SETTINGS } from "~/lib/constants";

export function AdminSidebar() {
	const location = useLocation();

	return (
		<Sidebar>
			<SidebarHeader className="border-b">
				<SidebarMenu>
					<SidebarMenuItem>
						<p className="p-2 font-bold text-2xl">Admin</p>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="p-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={location.pathname.startsWith(ROUTE_SETTINGS)}
						>
							<Link to={ROUTE_SETTINGS}>
								<SettingsIcon />
								System settings
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={location.pathname.startsWith(ROUTE_RESULTS)}
						>
							<Link to={ROUTE_RESULTS}>
								<BarChart3Icon />
								Results
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
