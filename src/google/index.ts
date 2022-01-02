import { Page } from 'puppeteer'
import googleSignIn from './sign_in.ts'
import deleteActivity from './delete_activity.ts'
import turnOffActivityTracking from './turn_off_tracking.ts'

interface GoogleOptions {
    delete_activity?: boolean,
    turn_off_tracking?: boolean
}

const google = async (page: Page, options: GoogleOptions, email?: string, password?: string) => {
  await page.goto('https://myactivity.google.com/myactivity')
  await googleSignIn(page, email, password)

  if (options.delete_activity) {
    await deleteActivity(page)
  }

  if (options.turn_off_tracking) {
    await turnOffActivityTracking(page)
  }
}

export default google
