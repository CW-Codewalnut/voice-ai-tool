import "./app.css";

// @ts-expect-error @fontsource-variable is not typed
import "@fontsource-variable/geist";

import type { MetaDescriptor } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { AppProviders } from "~/components/providers";

import { SidebarProvider } from "./components/ui/sidebar";
import { AdminSidebar } from "./workflows/admin/layout/sidebar";

export function meta() {
	return [
		{ title: "Voice Based Survey Tool | CodeWalnut" },
		{ name: "description", content: "Voice Based Survey Tool by CodeWalnut" },
	] satisfies MetaDescriptor[];
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<AppProviders>
			<SidebarProvider>
				<AdminSidebar />
				<Outlet />
			</SidebarProvider>
		</AppProviders>
	);
}
