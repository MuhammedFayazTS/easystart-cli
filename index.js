#!/usr/bin/env node

const { Command } = require("commander");
const featureCommand = require("./src/commands/feature");

const program = new Command();

program
  .name("cli")
  .description("Express Feature Generator CLI")
  .version("1.0.0");

program
  .command("feature <name>")
  .description("Generate feature files")
  .action(featureCommand);

program.parse();