import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const facebookSignIn = async (page: Page, email?: string, password?: string) => {
  await page.waitForSelector(selectors.facebook.accept_cookies, { visible: true })
  await page.click(selectors.facebook.accept_cookies)

  await page.waitForSelector('#email', { visible: true })
  await page.type('#email', email || process.env.FACEBOOK_USER as string)
  await page.type('#pass', password || process.env.FACEBOOK_PWD as string)
  await page.click(selectors.common.submit)
  await page.waitForNavigation()
}

export default facebookSignIn
