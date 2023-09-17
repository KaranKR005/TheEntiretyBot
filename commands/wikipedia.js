const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
    name: 'wikipedia',
    aliases: ['wiki'],
    permissions: ["MANAGE_MESSAGES"],
    cooldown: 0,
    description: "This is a web search command",
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.channel.send('Please enter a query to get info about it!');
        const name = args.join(" ");

        const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${name}`)
            .then(res => res.json().catch(() => { }));
        if (!body)
            return message.channel.send("Page not found :x:");
        if (body.title && body.title === "Not found.")
            return message.channel.send("Error! Page Not Found... :x:");

        const embed = new Discord.MessageEmbed()
            .setColor('#660019')
            .setAuthor(`${body.title}`, 'https://upload.wikimedia.org/wikipedia/commons/d/de/Wikipedia_Logo_1.0.png', body.content_urls.desktop.page)
            .addField("More Info", `**[Click Here to get more info on ${body.title}](${body.content_urls.desktop.page})**`, true)
            .setDescription(`${body.extract}`)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        if (body.thumbnail) embed
            .setThumbnail(body.thumbnail.source);
        message.channel.send(embed);
    }
}