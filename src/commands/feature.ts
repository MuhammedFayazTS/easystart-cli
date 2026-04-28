import { loadConfig } from "../core/config-loader";
import { createNameVariants } from "../core/name-utils";

export function featureCommand(inputName: string): void {
  console.log("Creating feature:", inputName);

  const config = loadConfig();

  console.log("config:", config);

  const names = createNameVariants(inputName);

  console.log("Name variants:", names);
}