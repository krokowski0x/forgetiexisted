const { Select } = require('enquirer');

(async () => {
    try {
        const prompt = new Select({
            name: 'social_media',
            message: 'Pick a flavor',
            choices: ['Google/YouTube', 'Facebook/Instagram']
          });
        const social_media = prompt.run()
        console.info(social_media)
    } catch (error) {
        console.error(error)
    }
})()
