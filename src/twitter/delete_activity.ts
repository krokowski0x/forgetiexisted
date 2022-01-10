/* eslint-disable no-await-in-loop */
import { Page } from 'puppeteer'
import logger from '../common/logger'
import selectors from '../selectors.json'

const deleteTwitterActivity = async (page: Page, username?: string) => {
  logger.log('Twitter', 'deleting activity', 'fetching activity log')
  await page.goto(`https://twitter.com/${username || process.env.TWITTER_USER}`)

  logger.log('Twitter', 'deleting activity', 'removing activity items')
  // TODO: This can run forver, so it should probably be saving deletion
  // progress to a file at ceratian checkpoints, e.g. every deleted month
  while (await page.$(selectors.twitter.activity_item_open_actions_btn)) {
    await page.waitForSelector(selectors.twitter.activity_item_open_actions_btn, { visible: true })
    await page.click(selectors.twitter.activity_item_open_actions_btn)

    await page.waitForSelector(selectors.twitter.activity_item_delete_btn, { visible: true })
    await page.click(selectors.twitter.activity_item_delete_btn)

    await page.waitForSelector(selectors.twitter.activity_item_confirm_btn, { visible: true })
    await page.click(selectors.twitter.activity_item_confirm_btn)

    logger.log('Twitter', 'deleting activity', 'activity item removed!')
  }
}

export default deleteTwitterActivity
