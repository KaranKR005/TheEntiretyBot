const Discord = require("discord.js");
const request = require("node-superfetch");
const { execute } = require("./info");
module.exports = {
    name: 'google',
    aliases: ['gg'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This command searchs google images",
    async execute(message, args, cmd, client, Discord) {
        let googleKey = process.env.GOOGLEKEY;
        let csx = process.env.GOOGLECSX;
        let query = args.join(" ");
        let result;

        if (!query) return message.channel.send("Please provide a name to get its image.");
        href = await search(query);
        if (!href) return message.channel.send("❌Unknown Search.❌");

        const embed = new Discord.MessageEmbed()
            .setColor('#3F3A96')
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
            .setURL(href.link)
            .setTimestamp()
            .setFooter('Powered by Google\nTheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

        return message.channel.send(embed);

        async function search(query) {
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: googleKey, cx: csx, safe: "off", q: query
            });

            if (!body.items) return null;
            return body.items[0];
        }

    }
}