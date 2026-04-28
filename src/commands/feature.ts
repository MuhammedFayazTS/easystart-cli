import { loadConfig } from "../core/config-loader";
import { writeFiles } from "../core/file-writer";
import { generateFiles } from "../core/generator";
import { createNameVariants } from "../core/name-utils";

export function featureCommand(inputName: string): void {
  console.log("Creating feature:", inputName);

  const config = loadConfig();
  const names = createNameVariants(inputName);

  const files = generateFiles(config, names);

  writeFiles(files);
}