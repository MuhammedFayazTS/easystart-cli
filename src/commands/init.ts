import fs from "fs";
import path from "path";
import { logger } from "../core/logger";

const defaultConfig = {
    layers: {
        controller: {
            path: "src/controllers",
            template: "_templates/controller.hbs",
            filename: "{{name}}.controller.js",
        },
    },
};

export function initCommand() {
    const rootPath = process.cwd();

    const configPath = path.join(rootPath, "cli.config.json");

    const templatesPath = path.join(rootPath, "_templates");

    if (fs.existsSync(configPath)) {
        console.log("Config already exists");
        return;
    }

    fs.writeFileSync(
        configPath,
        JSON.stringify(defaultConfig, null, 2)
    );

    fs.mkdirSync(templatesPath, {
        recursive: true,
    });

    logger.success("EasyStart initialized successfully");
}