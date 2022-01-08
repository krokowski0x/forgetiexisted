import run from './common/pupeteer'

(async () => {
  // run('Facebook', { delete_activity: true })
  run('Google', { turn_off_search_tracking: true, turn_off_location_tracking: true, turn_off_youtube_tracking: true })
})()
