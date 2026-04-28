import { loadConfig } from "../core/config-loader";
import { generateFiles } from "../core/generator";
import { createNameVariants } from "../core/name-utils";

export function featureCommand(inputName: string): void {
  console.log("Creating feature:", inputName);

  const config = loadConfig();
  const names = createNameVariants(inputName);

  const files = generateFiles(config, names);

  console.log("\nGenerated Files:\n");

  for (const file of files) {
    console.log("Path:", file.filePath);
    console.log(file.content);
    console.log("----------");
  }
}