import { Page } from 'puppeteer'
import selectors from '../selectors.json'

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