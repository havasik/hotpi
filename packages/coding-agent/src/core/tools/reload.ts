import type { AgentTool } from "@mariozechner/pi-agent-core";
import { Type } from "@sinclair/typebox";
import type { ToolDefinition } from "../extensions/types.js";
import { wrapToolDefinition } from "./tool-definition-wrapper.js";

const reloadSchema = Type.Object({});

export interface ReloadToolOptions {
	/** Callback to request a reload after the current agent loop finishes. */
	requestReload: () => void;
}

export function createReloadToolDefinition(
	_cwd: string,
	options: ReloadToolOptions,
): ToolDefinition {
	return {
		name: "reload_extensions",
		label: "Reload Extensions",
		description:
			"Reload all extensions, skills, prompts, and themes. " +
			"Call this after writing or modifying a Pi extension to activate the changes. " +
			"The reload happens after the current response completes.",
		parameters: reloadSchema,
		async execute() {
			options.requestReload();
			return {
				content: [
					{
						type: "text" as const,
						text: "Reload scheduled. Extensions, skills, prompts, and themes will reload after this response completes.",
					},
				],
			};
		},
	};
}

export function createReloadTool(cwd: string, options: ReloadToolOptions): AgentTool {
	return wrapToolDefinition(createReloadToolDefinition(cwd, options));
}
