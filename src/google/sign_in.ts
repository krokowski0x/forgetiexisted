import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const googleSignIn = async (page: Page, email?: string, password?: string) => {
  await page.waitForSelector(selectors.google.sign_in, { visible: true })
  await page.click(selectors.google.sign_in)

  await page.waitForNavigation()

  await page.waitForSelector(selectors.common.email, { visible: true })
  await page.type(selectors.common.email, email || process.env.GOOGLE_USER as string)
  await page.click('#identifierNext')

  await page.waitForSelector(selectors.common.password, { visible: true })
  await page.type(selectors.common.password, password || process.env.GOOGLE_PWD as string)

  await page.waitForSelector('#passwordNext', { visible: true })
  await page.click('#passwordNext')

  await page.waitForNavigation()
}

export default googleSignIn
