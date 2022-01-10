import chalk from 'chalk'

const getProviderColor = (provider: 'Google' | 'Facebook' | 'Twitter'): string => {
  switch (provider) {
    case 'Google':
      return chalk.bgRed(provider)
    case 'Facebook':
      return chalk.bgBlue(provider)
    case 'Twitter':
      return chalk.bgCyan(provider)
    default:
      return ''
  }
}

export default {
  log: (provider: 'Google' | 'Facebook' | 'Twitter', step: string, msg: string) => console.info(
    getProviderColor(provider),
    chalk.magenta(step),
    chalk.blue(msg),
  ),
  error: (msg: string) => console.info(chalk.red(msg)),
}
