import type { Control } from "react-hook-form";

import type { SystemSettingsFormInput } from "@cw/shared";

export const MIN_VOICE_SPEED = 0.25;
export const MAX_VOICE_SPEED = 1.5;

export const VOICES = [
	"alloy",
	"ash",
	"ballad",
	"coral",
	"echo",
	"sage",
	"shimmer",
	"verse",
] as const;

export type SettingsFormElemProps = {
	formControl: Control<SystemSettingsFormInput>;
};
