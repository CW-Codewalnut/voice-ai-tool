import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import type { Context } from "./context";
import { ENV } from "./env";

const t = initTRPC.context<Context>().create({
	transformer: superjson,
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	const userEmail = ctx.session?.user?.email;
	if (!ctx.session || !userEmail) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Authentication required",
			cause: "No session",
		});
	}

	if (userEmail && ENV.ADMIN_EMAILS.includes(userEmail)) {
		return next({
			ctx: {
				...ctx,
				session: ctx.session,
			},
		});
	}

	throw new TRPCError({
		code: "UNAUTHORIZED",
		message: "Not authorized",
		cause: "Not admin",
	});
});
