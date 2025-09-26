import { copyFileSync, existsSync } from "node:fs";
import { $ } from "bun";

$.throws(true);

async function copyIfMissing(src: string, dest: string) {
	if (existsSync(dest)) {
		console.log(`Skipping ${dest} (already exists)`);
		return;
	}
	copyFileSync(src, dest);
	console.log(`Created ${dest} from ${src}`);
}

try {
	console.log("Installing dependencies...");
	await $`bun install`;
	console.log("✅ Dependencies installed successfully.");

	console.log("Copying environment files (will not overwrite existing)...");
	await copyIfMissing("apps/api/.env.example", "apps/api/.env");
	await copyIfMissing("apps/web/.env.example", "apps/web/.env");
	console.log("✅ Environment files checked.");

	console.log("Running database migration...");
	await $`mkdir -p apps/api/.database`;
	await $`bun db:migrate`;
	console.log("✅ Database migration completed successfully.");

	console.log("Seeding database...");
	await $`bun db:seed`;
	console.log("✅ Database seeded successfully.");

	console.log("\n🚀 Project setup complete!");
	console.log(
		"\nPaste the appropriate environment variables into your .env files.",
	);
	console.log("\nThen run `bun dev` to start the development server.");
} catch (error) {
	console.error("\n❌ An error occurred during setup:");
	console.error(error);
	process.exit(1);
}
