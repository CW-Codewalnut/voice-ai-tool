import type { Control } from "react-hook-form";

import type { SystemSettingsFormInput } from "@cw/shared";

export const VOICES = [
	"alloy",
	"ash",
	"ballad",
	"cedar",
	"coral",
	"echo",
	"marin",
	"sage",
	"shimmer",
	"verse",
] as const;

export type SettingsFormElemProps = {
	formControl: Control<SystemSettingsFormInput>;
};

export { MAX_VOICE_SPEED, MIN_VOICE_SPEED } from "@cw/shared";
