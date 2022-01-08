import { Page } from 'puppeteer'
import logger from '../common/logger'
import selectors from '../selectors.json'

const facebookSignIn = async (page: Page, email?: string, password?: string) => {
  logger.log('Facebook', 'signing in', 'accepting cookies')
  await page.waitForSelector(selectors.facebook.accept_cookies, { visible: true })
  await page.click(selectors.facebook.accept_cookies)

  logger.log('Facebook', 'signing in', 'entering email')
  await page.waitForSelector('#email', { visible: true })
  await page.type('#email', email || process.env.FACEBOOK_USER as string)

  logger.log('Facebook', 'signing in', 'entering password')
  await page.type('#pass', password || process.env.FACEBOOK_PWD as string)

  logger.log('Facebook', 'signing in', 'submitting')
  await page.click(selectors.common.submit)
  await page.waitForNavigation()
}

export default facebookSignIn
