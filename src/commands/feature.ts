import { loadConfig } from "../core/config-loader";
import { createNameVariants } from "../core/name-utils";
import { generateFiles } from "../core/generator";
import { writeFiles } from "../core/file-writer";
import { logger } from "../core/logger";

export function featureCommand(inputName: string): void {
  const names = createNameVariants(inputName);

  logger.box(`Feature Generated: ${names.Name}`);

  const config = loadConfig();
  const files = generateFiles(config, names);

  writeFiles(files);
}