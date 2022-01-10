import { prompt } from 'enquirer'
import logger from '../common/logger'
import run from '../common/pupeteer'
import { PromptAnswers } from '../types'

(async () => {
  try {
    const answers: PromptAnswers = await prompt([{
      type: 'select',
      name: 'social_media',
      message: 'Pick a flavor',
      choices: ['Google', 'Facebook', 'Twitter'],
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email/username?',
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?',
    },
    {
      type: 'multiselect',
      name: 'actions',
      message: 'What do you want to take?',
      choices: [{
        name: 'Delete all activity',
        value: 'delete_activity',
      },
      {
        name: 'Turn off location tracking (Google only)',
        value: 'location_tracking',
      },
      {
        name: 'Turn off Youtube tracking (Google only)',
        value: 'youtube_tracking',
      },
      {
        name: 'Turn off search-related tracking (Google only)',
        value: 'search_tracking',
      },
      ],
      result(names) {
        // @ts-ignore
        return this.map(names)
      },
    },
    ])

    if (answers.social_media === 'Google') {
      await run('Google', {
        // @ts-ignore
        delete_activity: !!answers.actions.delete_activity,
        // @ts-ignore
        turn_off_location_tracking: !!answers.actions.location_tracking,
        // @ts-ignore
        turn_off_youtube_tracking: !!answers.actions.youtube_tracking,
        // @ts-ignore
        turn_off_search_tracking: !!answers.actions.search_tracking,
      }, answers.email, answers.password)
    }

    if (answers.social_media === 'Facebook') {
      await run('Facebook', {
        // @ts-ignore
        delete_activity: !!answers.actions.delete_activity,
      }, answers.email, answers.password)
    }

    if (answers.social_media === 'Twitter') {
      await run('Twitter', {
        // @ts-ignore
        delete_activity: !!answers.actions.delete_activity,
      }, answers.email, answers.password)
    }
  } catch (err) {
    logger.error(err as string)
  }
})()
