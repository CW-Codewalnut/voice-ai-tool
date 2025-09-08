import { router } from "../lib/trpc";
import { adminRouter } from "./admin";

export const appRouter = router({
	admin: adminRouter,
});
