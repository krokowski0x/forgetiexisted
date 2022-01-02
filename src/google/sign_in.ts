import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const googleSignIn = async (page: Page, email?: string, password?: string) => {
    await page.waitForSelector(selectors.google_sign_in, { visible: true })
    await page.click(selectors.google_sign_in)
  
    await page.waitForNavigation()
    
    await page.waitForSelector(selectors.email, { visible: true })
    await page.type(selectors.email, email || process.env.GOOGLE_USER as string)
    await page.click('#identifierNext')
  
    await page.waitForSelector(selectors.password, { visible: true })
    await page.type(selectors.password, password || process.env.GOOGLE_PWD as string)
  
    await page.waitForSelector('#passwordNext', { visible: true })
    await page.click('#passwordNext')
  
    await page.waitForNavigation()
  }

export default googleSignIn