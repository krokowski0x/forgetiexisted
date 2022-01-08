import { Page } from 'puppeteer'
import logger from '../common/logger'
import selectors from '../selectors.json'

const checkIfLocationTrackingExists = async (page: Page) => {
  const activityControlsCount = await page.$$eval(
    selectors.google.activity_controls,
    (controls) => controls.length + 1,
  ) as unknown

  if (activityControlsCount === 2) {
    selectors.google.youtube_controls = `${selectors.google.activity_controls} > a:nth-child(2)`
    selectors.google.location_controls = ''
  }

  if (activityControlsCount === 3) {
    selectors.google.youtube_controls = `${selectors.google.activity_controls} > a:nth-child(3)`
    selectors.google.location_controls = `${selectors.google.activity_controls} > a:nth-child(2)`
  }
}

const turnOffActivityTracking = async (page: Page) => {
  logger.log('Google', 'turning off tracking', '')
  await page.waitForSelector(selectors.google.activity_controls)

  await checkIfLocationTrackingExists(page)

  if (selectors.google.location_controls !== '') {
    await turnOffLocationTracking(page)
    await page.waitForSelector(selectors.google.activity_controls)
  }

  await turnOffYoutubeTracking(page)
  await page.waitForSelector(selectors.google.activity_controls)
  await turnOffSearchTracking(page)
}

const turnOffLocationTracking = async (page: Page) => {
  logger.log('Google', 'turning off tracking', 'turning off location tracking')
  await page.click(selectors.google.location_controls)

  await page.waitForSelector(selectors.google.turn_off_location_history)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_location_history)

  await page.waitForSelector(selectors.google.turn_off_history_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_history_btn)

  await page.waitForSelector(selectors.google.turn_off_history_confirm_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_history_confirm_btn)

  await page.waitForSelector(selectors.common.go_back_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.common.go_back_btn)
  await page.waitForTimeout(1000)
  logger.log('Google', 'turning off tracking', 'turned off location tracking!')
}

const turnOffYoutubeTracking = async (page: Page) => {
  logger.log('Google', 'turning off tracking', 'turning off youtube tracking')
  await page.click(selectors.google.youtube_controls)

  await page.waitForSelector(selectors.google.turn_off_youtube_history)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_youtube_history)

  await page.waitForSelector(selectors.google.turn_off_history_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_history_btn)

  await page.waitForSelector(selectors.google.turn_off_history_confirm_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_history_confirm_btn)

  await page.waitForSelector(selectors.common.go_back_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.common.go_back_btn)
  await page.waitForTimeout(1000)
  logger.log('Google', 'turning off tracking', 'turned off youtube tracking!')
}

const turnOffSearchTracking = async (page: Page) => {
  logger.log('Google', 'turning off tracking', 'turning off search tracking')
  await page.click(selectors.google.search_controls)

  await page.waitForSelector(selectors.google.turn_off_search_history)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_search_history)

  await page.waitForSelector(selectors.google.turn_off_history_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_history_btn)

  await page.waitForSelector(selectors.google.turn_off_history_confirm_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.google.turn_off_history_confirm_btn)

  await page.waitForSelector(selectors.common.go_back_btn)
  await page.waitForTimeout(1000)
  await page.click(selectors.common.go_back_btn)
  await page.waitForTimeout(1000)
  logger.log('Google', 'turning off tracking', 'turned off search tracking!')
}

export default turnOffActivityTracking
