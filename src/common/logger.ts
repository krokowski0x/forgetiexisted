import chalk from 'chalk'

export default {
  step: (provider: 'Google' | 'Facebook', msg: string) => console.info(chalk.bgBlue(provider), chalk.blue(msg)),
  error: (msg: string) => console.info(chalk.magenta(msg)),
}
