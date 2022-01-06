import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as dotenv from 'dotenv'
import deleteFacebookActivity from './facebook/delete_activity'
import facebookSignIn from './facebook/sign_in'

dotenv.config()

puppeteer
  .use(StealthPlugin())
  .launch({ headless: false })
  .then(async (browser) => {
    const page = await browser.newPage()
    await page.setViewport({
      width: 1200,
      height: 1200,
    })

    // Facebook
    await page.goto('https://www.facebook.com/')
    await facebookSignIn(page)
    await deleteFacebookActivity(page)

    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'example.png' })
    await browser.close()
  })
