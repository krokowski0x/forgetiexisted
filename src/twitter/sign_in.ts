import { Page } from 'puppeteer'
import logger from '../common/logger'
import selectors from '../selectors.json'

const twitterSignIn = async (page: Page, email?: string, password?: string) => {
  logger.log('Twitter', 'signing in', 'redirecting to signin')
  await page.waitForSelector(selectors.twitter.sign_in, { visible: true })
  await page.click(selectors.twitter.sign_in)

  await page.waitForNavigation()

  logger.log('Twitter', 'signing in', 'entering username')
  await page.waitForSelector(selectors.twitter.username, { visible: true })
  await page.type(selectors.twitter.username, email || process.env.TWITTER_USER as string)
  await page.click(selectors.twitter.next_btn)

  logger.log('Twitter', 'signing in', 'entering password')
  await page.waitForSelector(selectors.common.password, { visible: true })
  await page.type(selectors.common.password, password || process.env.TWITTER_PWD as string)

  await page.waitForSelector(selectors.twitter.next_btn, { visible: true })
  await page.click(selectors.twitter.next_btn)

  logger.log('Twitter', 'signing in', 'submitting')
  await page.waitForNavigation()
}

export default twitterSignIn
