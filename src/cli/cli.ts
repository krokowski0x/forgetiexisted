import { prompt } from 'enquirer'
import run from '../pupeteer'

interface PromptAnswers {
    social_media: 'Google' | 'Facebook',
    email ? : string,
    password ? : string,
    actions: Map < string, string >
}

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
        name: 'Turn off location tracking',
        value: 'location_tracking',
      },
      {
        name: 'Turn off Youtube tracking',
        value: 'youtube_tracking',
      },
      {
        name: 'Turn off search-related tracking',
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
      await run({
        type: 'Google',
      }, answers.email, answers.password)
    }
  } catch (error) {
    console.error(error)
  }
})()
