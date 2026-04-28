import { loadConfig } from "../core/config-loader";
import { createNameVariants } from "../core/name-utils";
import { renderTemplate } from "../core/template-engine";

export function featureCommand(inputName: string): void {
  console.log("Creating feature:", inputName);

  const config = loadConfig();
  const names = createNameVariants(inputName);

  const variables = {
    name: names.name,
    Name: names.Name,
  };

  const output = renderTemplate(
    "templates/controller.hbs",
    variables
  );

  console.log("\nGenerated Template:\n");
  console.log(output);
}