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
      choices: ['Google', 'Facebook'],
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
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
        delete_activity: !!answers.actions.get('delete_activity'),
        turn_off_location_tracking: !!answers.actions.get('location_tracking'),
        turn_off_youtube_tracking: !!answers.actions.get('youtube_tracking'),
        turn_off_search_tracking: !!answers.actions.get('search_tracking'),
      }, answers.email, answers.password)
    }

    if (answers.social_media === 'Facebook') {
      await run('Facebook', {
        delete_activity: !!answers.actions.get('delete_activity'),
      }, answers.email, answers.password)
    }
  } catch (err) {
    logger.error(err as string)
  }
})()
