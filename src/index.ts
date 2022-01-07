import run from './common/pupeteer'

(async () => {
  run('Facebook', { delete_activity: true })
})()
