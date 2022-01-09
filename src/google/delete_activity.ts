import { Page } from 'puppeteer'
import logger from '../common/logger'
import selectors from '../selectors.json'

const deleteGoogleActivity = async (page: Page) => {
  logger.log('Google', 'deleting activity', 'removing activity items')
  await page.waitForSelector(selectors.google.delete_activity)
  await page.waitForTimeout(500)
  await page.click(selectors.google.delete_activity)

  await page.waitForSelector(selectors.google.delete_all)
  await page.waitForTimeout(500)
  await page.click(selectors.google.delete_all)

  await page.waitForSelector(selectors.google.delete_all_next_btn)
  await page.waitForTimeout(500)
  await page.click(selectors.google.delete_all_next_btn)

  await page.waitForSelector(selectors.google.delete_all_delete_btn)
  await page.waitForTimeout(500)
  await page.click(selectors.google.delete_all_delete_btn)

  await page.waitForSelector(selectors.google.delete_all_ok_btn)
  await page.waitForTimeout(500)
  await page.click(selectors.google.delete_all_ok_btn)

  await page.waitForTimeout(500)
  logger.log('Google', 'deleting activity', 'activity items deleted!')
}

export default deleteGoogleActivity
