import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as dotenv from 'dotenv'
import google from './google'

dotenv.config()

interface Options {
  type: 'Google' | 'Facebook',
}

const run = async (options: Options, email?: string, password?: string) => {
  puppeteer
    .use(StealthPlugin())
    .launch({ headless: false })
    .then(async (browser) => {
      const page = await browser.newPage()
      await page.setViewport({
        width: 1200,
        height: 1200,
      })

      if (options.type === 'Google') {
        await google(page, {}, email, password)
      }

      await page.waitForTimeout(2000)
      await page.screenshot({ path: 'example.png' })
      await browser.close()
    })
}

export default run
