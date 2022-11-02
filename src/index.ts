// @ts-ignore
import puppeteer from 'puppeteer'
import { Client, IntentsBitField } from 'discord.js'
import { config } from 'dotenv-flow'
import messageHandling from './messageHandling'

config()

const client = new Client({ intents: [ IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages ] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.login(process.env.BOT_TOKEN as string);

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setCacheEnabled(false)
    await page.goto(process.env.PAGE_URL)
    setInterval(async () => {
        await page.reload()
        await page.waitForSelector(process.env.SCREENSHOT_ELEMENT)
        await page.waitForSelector(process.env.DROP_ELEMENT)
        const element = await page.$(process.env.SCREENSHOT_ELEMENT)
        if (element) {
            const time = new Date()
            const stamp = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}_${time.getHours()}-${time.getMinutes()}`
            await element.screenshot({ path: `img/${stamp}.png` })
            const dropName = (await page.$eval(process.env.DROP_ELEMENT, (element: any) => {
                return element.innerHTML
            })).replaceAll('\n', '').trim()
            messageHandling(client, stamp, dropName)
        }
    }, 5 * 60 * 1000)
})()