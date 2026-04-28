import fs from "fs";
import path from "path";
import { CliConfig } from "../types/config";

const CONFIG_FILE = "cli.config.json";

export function loadConfig(): CliConfig {
    const configPath = path.resolve(process.cwd(), CONFIG_FILE);

    // Check existence
    if (!fs.existsSync(configPath)) {
        throw new Error(`Config file not found: ${CONFIG_FILE}`);
    }

    // Read file
    const raw = fs.readFileSync(configPath, "utf-8");

    let parsed: unknown;

    try {
        parsed = JSON.parse(raw);
    } catch {
        throw new Error("Invalid JSON in config file");
    }

    // Basic validation
    validateConfig(parsed);

    return parsed as CliConfig;
}

function validateConfig(config: unknown): void {
    if (
        typeof config !== "object" ||
        config === null ||
        !("layers" in config)
    ) {
        throw new Error("Invalid config: 'layers' field missing");
    }

    const layers = (config as any).layers;

    if (typeof layers !== "object") {
        throw new Error("Invalid config: 'layers' must be an object");
    }

    for (const [key, layer] of Object.entries(layers)) {
        if (typeof layer !== "object" || layer === null) {
            throw new Error(`Invalid layer config: ${key}`);
        }

        if (!("path" in layer) || !("filename" in layer)) {
            throw new Error(
                `Layer "${key}" must have 'path' and 'filename'`
            );
        }
    }
}