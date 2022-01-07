export interface Options {
    delete_activity?: boolean,
    turn_off_search_tracking?: boolean,
    turn_off_youtube_tracking?: boolean,
    turn_off_location_tracking?: boolean
}

export interface PromptAnswers {
    social_media: 'Google' | 'Facebook',
    email?: string,
    password?: string,
    actions: Map <string, string>
}
