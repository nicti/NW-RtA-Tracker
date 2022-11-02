import { Client, EmbedBuilder } from 'discord.js'

export default function (client: Client, stamp: string, dropName: string) {
    client.channels.fetch(process.env.TARGET_CHANNEL_ID as string).then(async (channel: any) => {
        const embed = new EmbedBuilder()
            .setTitle('New World - RtA Update')
            .setDescription(`${process.env.DROP_TEXT}:\n${dropName}`)
            .setURL(process.env.PAGE_URL)
            .setImage(`attachment://${stamp}.png`)
            .setTimestamp()
            .setFooter({ text: 'Powered by nicti#4210' })
        // Attempt to fetch old message to update
        await channel.messages.fetch()
        const msg = channel.messages.cache.find(m => {
            return m.author.id === client.user?.id
        })
        if (msg) {
            await msg.edit({ embeds: [ embed ], files: [ { attachment: `img/${stamp}.png`, name: `${stamp}.png` } ] })
        } else {
            await channel.send({ embeds: [ embed ], files: [ { attachment: `img/${stamp}.png`, name: `${stamp}.png` } ] })
        }
    })
}