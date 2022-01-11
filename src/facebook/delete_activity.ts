/* eslint-disable no-await-in-loop */
import { Page } from 'puppeteer'
import logger from '../common/logger'
import selectors from '../selectors.json'

const deleteFacebookActivity = async (page: Page, email?: string) => {
  logger.log('Facebook', 'deleting activity', 'fetching activity log')
  await page.goto(`https://www.facebook.com/${email || process.env.FACEBOOK_USER_NAME}/allactivity/?activity_history=true&category_key=ALL&manage_mode=true`)

  logger.log('Facebook', 'deleting activity', 'removing activity items')
  // TODO: This can run forver, so it should probably be saving deletion
  // progress to a file at ceratian checkpoints, e.g. every deleted month
  while (await page.$(selectors.facebook.activity_item_open_actions_btn)) {
    await page.waitForSelector(selectors.facebook.activity_item_open_actions_btn, { visible: true })
    await page.click(selectors.facebook.activity_item_open_actions_btn)

    await page.waitForSelector(selectors.facebook.activity_item_delete_btn, { visible: true })
    await page.click(selectors.facebook.activity_item_delete_btn)

    await page.waitForSelector(selectors.facebook.activity_item_confirm_btn, { visible: true })
    await page.click(selectors.facebook.activity_item_confirm_btn)

    logger.log('Facebook', 'deleting activity', 'activity item removed!')
  }
}

export default deleteFacebookActivity
