import fs from "fs";
import path from "path";
import { GeneratedFile } from "./generator";
import { logger } from "./logger";

interface WriteOptions {
    force?: boolean;
}

export function writeFiles(
    files: GeneratedFile[],
    options: WriteOptions = {}
): void {
    let created = 0;
    let skipped = 0;
    let overwritten = 0;

    for (const file of files) {
        const fullPath = path.resolve(process.cwd(), file.filePath);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const exists = fs.existsSync(fullPath);

        if (exists && !options.force) {
            logger.warn(`Skipped (exists): ${file.filePath}`);
            skipped++;
            continue;
        }

        if (exists && options.force) {
            logger.warn(`Overwritten: ${file.filePath}`);
            overwritten++;
        } else {
            logger.success(`Created: ${file.filePath}`);
            created++;
        }

        fs.writeFileSync(fullPath, file.content, "utf-8");
    }

    logger.box(
        `Summary: ${created} created, ${skipped} skipped, ${overwritten} overwritten`
    );
}