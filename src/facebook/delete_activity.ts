import { Page } from 'puppeteer'
import selectors from '../selectors.json'

const deleteFacebookActivity = async (page: Page) => {
  await page.goto(`https://www.facebook.com/${process.env.FACEBOOK_USER_NAME}/allactivity/?activity_history=true&category_key=ALL&manage_mode=true`)

  while (true) {
    await page.waitForSelector(selectors.activity_item_open_actions_btn)
    await page.waitForTimeout(1000)
    await page.click(selectors.activity_item_open_actions_btn)

    await page.waitForSelector(selectors.activity_item_delete_btn)
    await page.waitForTimeout(1000)
    await page.click(selectors.activity_item_delete_btn)

    const isItemAReaction = !(await page.$(selectors.activity_item_delete_btn))
    if (isItemAReaction) {
      await page.waitForSelector(selectors.activity_item_confirm_btn)
      await page.waitForTimeout(1000)
      await page.click(selectors.activity_item_confirm_btn)
    }
  }
}

export default deleteFacebookActivity
