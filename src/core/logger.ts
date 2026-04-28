import chalk from "chalk";
import boxen from "boxen";

export const logger = {
  success(message: string) {
    console.log(chalk.green(`✔ ${message}`));
  },

  warn(message: string) {
    console.log(chalk.yellow(`⚠ ${message}`));
  },

  error(message: string) {
    console.log(chalk.red(`✖ ${message}`));
  },

  info(message: string) {
    console.log(chalk.blue(message));
  },

  box(message: string) {
    console.log(
      boxen(chalk.cyan(message), {
        padding: 1,
        borderColor: "cyan",
        borderStyle: "round",
      })
    );
  },
};