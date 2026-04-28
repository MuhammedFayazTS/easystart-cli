import fs from "fs";
import path from "path";

export function renderTemplate(
    templatePath: string,
    variables: Record<string, string>
): string {
    const fullPath = path.resolve(process.cwd(), templatePath);

    // Check if template exists
    if (!fs.existsSync(fullPath)) {
        console.warn(`Template not found: ${templatePath}`);
        return "";
    }

    // Read template
    const content = fs.readFileSync(fullPath, "utf-8");

    // Replace variables
    return replaceVariables(content, variables);
}

function replaceVariables(
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