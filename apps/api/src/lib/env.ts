import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const zodURL = z.string().url();
const zodString = z.string().min(1);

const zodURLorFile = z
	.string()
	.min(1)
	.refine((val) => {
		if (val.startsWith("file:")) return true;
		try {
			const u = new URL(val);
			return ["http:", "https:", "libsql:"].includes(u.protocol);
		} catch {
			return false;
		}
	}, "DATABASE_URL must be a libsql/http(s) URL or start with file:");

const semiColonDelimitedValues = z
	.string()
	.min(1)
	.transform((val) => {
		return val
			.split(";")
			.map((s) => s.trim())
			.filter(Boolean);
	});

export const ENV = createEnv({
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,

	server: {
		APP_PORT: z.coerce.number(),
		APP_URL: zodURL,
		CORS_ORIGINS: semiColonDelimitedValues,
		DATABASE_URL: zodURLorFile,
		DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
		GOOGLE_CLIENT_ID: zodString,
		GOOGLE_CLIENT_SECRET: zodString,

		AUTH_SECRET: zodString,
		OPENAI_API_KEY: zodString,

		ADMIN_EMAILS: semiColonDelimitedValues,
	},
});
