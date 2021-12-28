import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const deleteGoogleActivity = async (page: Page) => {
    await page.waitForSelector(selectors.delete_activity)
    await page.click(selectors.delete_activity)
  
    await page.waitForSelector(selectors.delete_all)
    await page.click(selectors.delete_all)
  
    await page.waitForSelector(selectors.delete_all_next_btn)
    await page.click(selectors.delete_all_next_btn)
  
    await page.waitForSelector(selectors.delete_all_delete_btn)
  }