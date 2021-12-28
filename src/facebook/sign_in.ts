import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const facebookSignIn = async (page: Page) => {
    await page.waitForSelector(selectors.accept_facebook_cookies, { visible: true})
    await page.click(selectors.accept_facebook_cookies)
  
    await page.waitForSelector('#email', { visible: true})
    await page.type('#email', process.env.FACEBOOK_USER as string)
    await page.type('#pass', process.env.FACEBOOK_PWD as string)
    await page.click('button[type="submit"]')
    await page.waitForNavigation()
  }