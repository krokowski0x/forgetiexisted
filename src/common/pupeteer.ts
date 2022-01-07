import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as dotenv from 'dotenv'
import google from '../google'
import facebook from '../facebook'
import { Options } from '../types'
import logger from './logger'

dotenv.config()

const run = async (type: 'Google' | 'Facebook', options: Options, email?: string, password?: string) => {
  puppeteer
    .use(StealthPlugin())
    .launch({ headless: false })
    .then(async (browser) => {
      const page = await browser.newPage()
      await page.setViewport({
        width: 1200,
        height: 1200,
      })

      if (type === 'Google') {
        await google(page, options, email, password)
      }

      if (type === 'Facebook') {
        await facebook(page, options, email, password)
      }

      await page.waitForTimeout(2000)
      await page.screenshot({ path: 'example.png' })
      await browser.close()
    })
    .catch((err) => {
      logger.error(err)
    })
}

export default run
