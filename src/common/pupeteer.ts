import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import * as dotenv from 'dotenv'
import google from '../google'
import facebook from '../facebook'
import twitter from '../twitter'
import { Options } from '../types'
import logger from './logger'

dotenv.config()

const run = async (provider: 'Google' | 'Facebook' | 'Twitter', options: Options, email?: string, password?: string) => {
  puppeteer
    .use(StealthPlugin())
    .launch({ headless: false })
    .then(async (browser) => {
      const page = await browser.newPage()
      await page.setViewport({
        width: 1200,
        height: 1200,
      })

      if (provider === 'Google') {
        await google(page, options, email, password)
      }

      if (provider === 'Facebook') {
        await facebook(page, options, email, password)
      }

      if (provider === 'Twitter') {
        await twitter(page, options, email, password)
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
