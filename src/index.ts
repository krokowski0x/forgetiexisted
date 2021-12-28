import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as dotenv from 'dotenv'

dotenv.config()

puppeteer
  .use(StealthPlugin())
  .launch({ headless: false })
  .then(async (browser) => {
    const page = await browser.newPage()
    await page.setViewport({
      width: 1400,
      height: 800
    })

    // Google
    // await page.goto('https://myactivity.google.com/myactivity')
    // await googleSignIn(page)
    // await deleteActivity(page)
    // await turnOffActivityTracking(page)

    // Facebook
    // await page.goto('https://www.facebook.com/')
    // await facebookSignIn(page)

    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'example.png' })
    await browser.close()
  })