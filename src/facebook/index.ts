import { Page } from 'puppeteer'
import facebookSignIn from './sign_in'
import deleteActivity from './delete_activity'
import { Options } from '../types'

const facebook = async (page: Page, options: Options, email?: string, password?: string) => {
  await page.goto('https://myactivity.facebook.com/myactivity')
  await facebookSignIn(page, email, password)

  if (options.delete_activity) {
    await deleteActivity(page, email)
  }
}

export default facebook
