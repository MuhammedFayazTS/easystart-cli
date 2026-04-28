import fs from "fs";
import path from "path";
import { GeneratedFile } from "./generator";
import { logger } from "./logger";

export function writeFiles(files: GeneratedFile[]): void {
    let created = 0;
    let skipped = 0;

    for (const file of files) {
        const fullPath = path.resolve(process.cwd(), file.filePath);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (fs.existsSync(fullPath)) {
            logger.warn(`Skipped (exists): ${file.filePath}`);
            skipped++;
            continue;
        }

        fs.writeFileSync(fullPath, file.content, "utf-8");

        logger.success(`Created: ${file.filePath}`);
        created++;
    }

    logger.box(`Summary: ${created} created, ${skipped} skipped`);
}