import fs from "fs";
import path from "path";
import { GeneratedFile } from "./generator";

export function writeFiles(files: GeneratedFile[]): void {
    for (const file of files) {
        const fullPath = path.resolve(process.cwd(), file.filePath);

        // Ensure directory exists
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Prevent overwrite (basic safety)
        if (fs.existsSync(fullPath)) {
            console.warn(`Skipping (already exists): ${file.filePath}`);
            continue;
        }

        // Write file
        fs.writeFileSync(fullPath, file.content, "utf-8");

        console.log(`Created: ${file.filePath}`);
    }
}