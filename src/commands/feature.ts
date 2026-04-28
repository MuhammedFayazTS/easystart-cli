import { loadConfig } from "../core/config-loader";
import { createNameVariants } from "../core/name-utils";
import { generateFiles } from "../core/generator";
import { writeFiles } from "../core/file-writer";
import { logger } from "../core/logger";

interface FeatureOptions {
  dryRun?: boolean;
  force?: boolean;
}

export function featureCommand(
  inputName: string,
  options: FeatureOptions
): void {
  const names = createNameVariants(inputName);

  logger.box(`Feature Generated: ${names.Name}`);

  const config = loadConfig();
  const files = generateFiles(config, names);

  if (options.dryRun) {
    logger.info("\n[Dry Run Mode] No files will be written\n");

    for (const file of files) {
      logger.info(`→ ${file.filePath}`);
    }

    return;
  }

  writeFiles(files, { force: options.force });
}