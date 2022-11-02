export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test'
            BOT_TOKEN: string
            PAGE_URL: string
            TARGET_CHANNEL_ID: string
            SCREENSHOT_ELEMENT: string
            DROP_ELEMENT: string
        }
    }
}