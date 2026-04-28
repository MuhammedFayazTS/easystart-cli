import path from "path";
import { CliConfig } from "../types/config";
import { renderTemplate } from "./template-engine";
import { NameVariants } from "./name-utils";

export interface GeneratedFile {
    filePath: string;
    content: string;
}

export function generateFiles(
    config: CliConfig,
    names: NameVariants
): GeneratedFile[] {
    const results: GeneratedFile[] = [];

    const variables = {
        name: names.name,
        Name: names.Name,
    };

    for (const [layerName, layer] of Object.entries(config.layers)) {
        // Resolve filename
        const fileName = applyVariables(layer.filename, variables);

        // Resolve full path
        const fullPath = path.join(layer.path, fileName);

        // Generate content
        let content = "";

        if (layer.template) {
            content = renderTemplate(layer.template, variables);
        }

        results.push({
            filePath: fullPath,
            content,
        });
    }

    return results;
}

function applyVariables(
    template: string,
    variables: Record<string, string>
): string {
    let result = template;

    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
        result = result.replace(regex, value);
    }

    return result;
}