import { Page } from 'puppeteer'
import facebookSignIn from './sign_in'
import deleteActivity from './delete_activity'
import { Options } from '../types'
import logger from '../common/logger'

const facebook = async (page: Page, options: Options, email?: string, password?: string) => {
  logger.log('Facebook', 'Launching', '')
  await page.goto('https://facebook.com')
  await facebookSignIn(page, email, password)

  if (options.delete_activity) {
    await deleteActivity(page, email)
  }
}

export default facebook
