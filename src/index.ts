import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as dotenv from 'dotenv';
import googleSignIn from './google/sign_in';
import deleteActivity from './google/delete_activity';
import turnOffActivityTracking from './google/turn_off_tracking';

dotenv.config();

puppeteer
  .use(StealthPlugin())
  .launch({ headless: false })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1200,
      height: 1200,
    });

    // Google
    await page.goto('https://myactivity.google.com/myactivity');
    await googleSignIn(page);
    await deleteActivity(page);
    await turnOffActivityTracking(page);

    // Facebook
    // await page.goto('https://www.facebook.com/')
    // await facebookSignIn(page)

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'example.png' });
    await browser.close();
  });
