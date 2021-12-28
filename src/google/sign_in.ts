import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const googleSignIn = async (page: Page) => {
    await page.waitForSelector(selectors.google_sign_in, {
      visible: true
    })
    await page.click(selectors.google_sign_in)
  
    await page.waitForNavigation()
  
    
    await page.waitForSelector(selectors.email, {
      visible: true
    })
    await page.type(selectors.email, process.env.GOOGLE_USER as string)
    await page.click('#identifierNext')
  
    
    await page.waitForSelector(selectors.password, {
      visible: true
    })
    await page.type(selectors.password, process.env.GOOGLE_PWD as string)
  
    await page.waitForSelector('#passwordNext', {
      visible: true
    })
    await page.click('#passwordNext')
  
    await page.waitForNavigation()
  }