import { getSystemPrompt } from "../routers/admin/prompt";
import { db } from "./index";
import sampleSettings from "./sample-settings.json";
import { systemSettings } from "./schema";

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
