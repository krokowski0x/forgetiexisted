import run from './common/pupeteer'

(async () => {
  await run('Twitter', { delete_activity: true })
})()
