import { Page } from 'puppeteer'
import twitterSignIn from './sign_in'
import deleteActivity from './delete_activity'
import { Options } from '../types'
import logger from '../common/logger'

const twitter = async (page: Page, options: Options, username?: string, password?: string) => {
  logger.log('Twitter', 'Launching', '')
  await page.goto('https://twitter.com/')
  await twitterSignIn(page, username, password)

  if (options.delete_activity) {
    await deleteActivity(page, username)
  }
}

export default twitter
