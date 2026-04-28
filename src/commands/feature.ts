import { loadConfig } from "../core/config-loader";

export function featureCommand(name: string): void {
  console.log("Creating feature:", name);

  const config = loadConfig();

  console.log("Loaded config:", config);
}