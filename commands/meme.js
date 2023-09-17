const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'meme',
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a meme command",
    async execute(message, args, cmd, client, Discord) {
        const third = args.join(" ");
        if (third) return;

        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                const memeEmbed = new Discord.MessageEmbed()
                    .setColor('#468499')
                    .setTitle(json.title)
                    .setURL(json.postLink)
                    .setImage(json.url)
                    .setTimestamp()
                    .setFooter(`TheEntiretyBot | from: ${json.subreddit}`, 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
                message.channel.send(memeEmbed);
            });

    }
}