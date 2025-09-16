import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { ENV } from "../lib/env";
import * as schema from "./schema";

const client = createClient({
	url: ENV.DATABASE_URL,
	...(ENV.DATABASE_AUTH_TOKEN ? { authToken: ENV.DATABASE_AUTH_TOKEN } : {}),
});

export const db = drizzle({
	client,
	schema,
});
