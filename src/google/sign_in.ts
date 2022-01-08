import { Page } from 'puppeteer'
import logger from '../common/logger'
import selectors from '../selectors.json'

const googleSignIn = async (page: Page, email?: string, password?: string) => {
  logger.log('Google', 'signing in', 'redirecting to signin')
  await page.waitForSelector(selectors.google.sign_in, { visible: true })
  await page.click(selectors.google.sign_in)

  await page.waitForNavigation()

  logger.log('Google', 'signing in', 'entering email')
  await page.waitForSelector(selectors.common.email, { visible: true })
  await page.type(selectors.common.email, email || process.env.GOOGLE_USER as string)
  await page.click('#identifierNext')

  logger.log('Google', 'signing in', 'entering password')
  await page.waitForSelector(selectors.common.password, { visible: true })
  await page.type(selectors.common.password, password || process.env.GOOGLE_PWD as string)

  await page.waitForSelector('#passwordNext', { visible: true })
  await page.click('#passwordNext')

  logger.log('Google', 'signing in', 'submitting')
  await page.waitForNavigation()
}

export default googleSignIn
