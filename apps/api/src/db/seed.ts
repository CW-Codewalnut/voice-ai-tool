import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { getSystemPrompt } from "../routers/admin/prompt";
import sampleSettings from "./sample-settings.json";
import { systemSettings } from "./schema";

// since we will be running this as part of setup script, we need to use process.env
// instead of using the db from the index file
const db = drizzle({
	client: createClient({
		url: process.env.DATABASE_URL ?? "",
	}),
});

async function seed() {
	console.log("🌱 Seeding database...");

	try {
		const existingSettings = await db.select().from(systemSettings);

		if (existingSettings.length > 0) {
			console.log("✅ System settings already exists");
			return;
		}

		await db.insert(systemSettings).values({
			...sampleSettings,
			systemPrompt: getSystemPrompt(sampleSettings),
		});

		console.log("✅ Successfully seeded database with default system settings");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		process.exit(1);
	}
}

if (import.meta.main) {
	await seed();
	process.exit(0);
}
