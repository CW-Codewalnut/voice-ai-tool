import { authClient } from "~/lib/auth";

export function useAuth() {
	return authClient.useSession();
}
