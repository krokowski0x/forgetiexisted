import chalk from 'chalk'

export default {
  log: (provider: 'Google' | 'Facebook', step: string, msg: string) => console.info(
    provider === 'Google' ? chalk.bgRed(provider) : chalk.bgBlue(provider),
    chalk.bgGreen(step),
    chalk.blue(msg),
  ),
  error: (msg: string) => console.info(chalk.magenta(msg)),
}
