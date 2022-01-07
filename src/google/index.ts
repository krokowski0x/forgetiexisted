import { Page } from 'puppeteer'
import googleSignIn from './sign_in'
import deleteActivity from './delete_activity'
import turnOffActivityTracking from './turn_off_tracking'
import { Options } from '../types'

const google = async (page: Page, options: Options, email?: string, password?: string) => {
  await page.goto('https://myactivity.google.com/myactivity')
  await googleSignIn(page, email, password)

  if (options.delete_activity) {
    await deleteActivity(page)
  }

  if (
    options.turn_off_location_tracking
    || options.turn_off_youtube_tracking
    || options.turn_off_search_tracking
  ) {
    await turnOffActivityTracking(page)
  }
}

export default google
