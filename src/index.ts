import puppeteer from 'puppeteer-extra'
import * as dotenv from 'dotenv'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Page } from 'puppeteer'
import chalk from 'chalk'

dotenv.config()

const selectors = {
  "google_sign_in": '#gb > div.gb_Fd.gb_Wd.gb_Md.gb_Ld > div.gb_Qd.gb_Sa.gb_Ed > div.gb_Me > a',
  "google_email": 'input[type="email"]',
  "google_password": 'input[type="password"]',
  "delete_activity": '#gb > div.gb_Cc.gb_Ac.gb_la.gb_Fc.gb_Hc > div.gb_Ic > div > c-wiz > div > div > nav > a:nth-child(4) > div',
  "delete_all": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div > c-wiz > div > div.cSvfje > ul > li:nth-child(3)',
  "delete_all_next_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div:nth-child(1) > c-wiz > div > div.F3FQK > div > div:nth-child(2) > div > button > span',
  "delete_all_delete_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div:nth-child(1) > c-wiz > div > div.F3FQK > div > div:nth-child(2) > button > span',
  "activity_controls": '#yDmH0d > c-wiz > div > div.jkOv3d > c-wiz:nth-child(4) > div',
  "search_controls": "#yDmH0d > c-wiz > div > div.jkOv3d > c-wiz:nth-child(4) > div > a:nth-child(1)",
  "location_controls": "",
  "youtube_controls": "",
  "turn_off_search_history": '#yDmH0d > c-wiz:nth-child(25) > div > div.Razgxc > div.Oq6DUb > c-wiz > div > div.xT0Qze > div.Y9OWvf > div > div.RezJOb > div.VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button',
  "turn_off_search_history_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div > c-wiz > div > div.F3FQK > div > div > div:nth-child(2) > div > button',
  "turn_off_search_history_confirm_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div > c-wiz > div > div.F3FQK > div > div > div > div > button',
  "turn_off_location_history": '#yDmH0d > c-wiz:nth-child(25) > div > div.Razgxc > div.szjZG > c-wiz > div > div.xT0Qze > div.Y9OWvf > div > div.RezJOb > div.VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button > div.VfPpkd-RLmnJb',
  "turn_off_location_history_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div > c-wiz > div > div.F3FQK > div > div > div:nth-child(2) > div > button',
  "turn_off_location_history_confirm_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div > c-wiz > div > div.F3FQK > div > div > div > div > button',
  "turn_off_youtube_history": '#yDmH0d > c-wiz:nth-child(25) > div > div.Razgxc > div.YMuRQe > c-wiz > div > div.xT0Qze > div.Y9OWvf > div > div.RezJOb > div.VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button',
  "turn_off_youtube_history_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div > c-wiz > div > div.F3FQK > div > div > div:nth-child(2) > div > button',
  "turn_off_youtube_history_confirm_btn": '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.HbiE4d.Up8vH.Whe8ub.hFEqNb.J9Nfi.iWO5td > span > div.Df8Did > div > c-wiz > div > div.F3FQK > div > div > div > div > button > span',
  "go_back_btn": '#gb > div.gb_Fd.gb_Wd.gb_Md.gb_Ld > div.gb_Ed.gb_Wc.gb_Xc > div.gb_uc.gb_xc'
}

const googleSignIn = async (page: Page) => {
  await page.waitForSelector(selectors.google_sign_in, {
    visible: true
  })
  await page.click(selectors.google_sign_in)

  await page.waitForNavigation()

  
  await page.waitForSelector(selectors.google_email, {
    visible: true
  })
  await page.type(selectors.google_email, process.env.GOOGLE_USER as string)
  await page.click('#identifierNext')

  
  await page.waitForSelector(selectors.google_password, {
    visible: true
  })
  await page.type(selectors.google_password, process.env.GOOGLE_PWD as string)

  await page.waitForSelector('#passwordNext', {
    visible: true
  })
  await page.click('#passwordNext')

  await page.waitForNavigation()
}

const deleteActivity = async (page: Page) => {
  await page.waitForSelector(selectors.delete_activity)
  await page.click(selectors.delete_activity)

  await page.waitForSelector(selectors.delete_all)
  await page.click(selectors.delete_all)

  await page.waitForSelector(selectors.delete_all_next_btn)
  await page.click(selectors.delete_all_next_btn)

  await page.waitForSelector(selectors.delete_all_delete_btn)
}

const turnOffActivityTracking = async (page: Page) => {
  
  await page.waitForSelector(selectors.activity_controls)
  const activityControlsCount = await page.$$eval(selectors.activity_controls, (controls) => controls.length + 1) as unknown;

  if (activityControlsCount === 2) {
    selectors.youtube_controls = `${selectors.activity_controls} > a:nth-child(2)`
    selectors.location_controls = ''
  }

  if (activityControlsCount === 3) {
    selectors.youtube_controls = `${selectors.activity_controls} > a:nth-child(3)`
    selectors.location_controls = `${selectors.activity_controls} > a:nth-child(2)`
  }

  if (selectors.location_controls !== '') {
    await turnOffLocationTracking(page)
  }

  await turnOffYoutubeTracking(page)
  await turnOffSearchTracking(page)
}

const turnOffLocationTracking = async (page: Page) => {
  
  await page.click(selectors.location_controls)

  await page.waitForSelector(selectors.turn_off_location_history)
  await page.click(selectors.turn_off_location_history)

  await page.waitForSelector(selectors.turn_off_location_history_btn)
  await page.waitForTimeout(2000)
  await page.click(selectors.turn_off_location_history_btn)

  await page.waitForSelector(selectors.turn_off_location_history_confirm_btn)
  await page.click(selectors.turn_off_location_history_confirm_btn)

  await page.waitForSelector(selectors.go_back_btn)
  await page.click(selectors.go_back_btn)
  await page.waitForNavigation()
  
}

const turnOffYoutubeTracking = async (page: Page) => {
  await page.click(selectors.youtube_controls)

  await page.waitForSelector(selectors.turn_off_youtube_history)
  await page.click(selectors.turn_off_youtube_history)

  await page.waitForSelector(selectors.turn_off_youtube_history_btn, {
    visible: true
  })
  await page.waitForTimeout(1000)
  await page.click(selectors.turn_off_youtube_history_btn)
  

  await page.waitForSelector(selectors.turn_off_youtube_history_confirm_btn, {
    visible: true
  })
  await page.waitForTimeout(1000)
  await page.click(selectors.turn_off_youtube_history_confirm_btn)

  await page.waitForSelector(selectors.go_back_btn, {
    visible: true
  })
  await page.waitForTimeout(1000)
  await page.click(selectors.go_back_btn)
}

const turnOffSearchTracking = async (page: Page) => {
  await page.click(selectors.search_controls)

  await page.waitForSelector(selectors.turn_off_search_history, {
    visible: true
  })
  await page.waitForTimeout(1000)
  await page.click(selectors.turn_off_search_history)

  await page.waitForSelector(selectors.turn_off_search_history_btn, {
    visible: true
  })
  await page.waitForTimeout(1000)
  await page.click(selectors.turn_off_search_history_btn)

  await page.waitForSelector(selectors.turn_off_search_history_confirm_btn, {
    visible: true
  })
  await page.waitForTimeout(1000)
  await page.click(selectors.turn_off_search_history_confirm_btn)

  await page.waitForSelector(selectors.go_back_btn, {
    visible: true
  })
  await page.waitForTimeout(1000)
  await page.click(selectors.go_back_btn)
  
}

puppeteer
  .use(StealthPlugin())
  .launch({
    headless: false
  })
  .then(async (browser) => {
    const page = await browser.newPage()

    await page.setViewport({
      width: 1400,
      height: 800
    })
    await page.goto('https://myactivity.google.com/myactivity')

    await googleSignIn(page)
    await deleteActivity(page)
    await turnOffActivityTracking(page)

    await page.waitForTimeout(2000)
    await page.screenshot({
      path: 'example.png'
    })

    await browser.close()
  })