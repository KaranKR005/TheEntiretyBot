const Discord = require('discord.js');
const ytsr = require('ytsr');
module.exports = {
    name: 'ytsearch',
    aliases: ['ytv'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a youtube command",
    async execute(message, args, cmd, client, Discord) {
        const query = args.join(" ");
        if (!query) return message.channel.send('Please provide a name of a video to search!');
        const res = await ytsr(query).catch(e => {
            return message.channel.send('No result were found!');
        });
        const video = res.items.filter(i => i.type === "video")[0];
        if (!video) return message.channel.send('Please provide a name of a video to search!');

        const youtubeEmbed = new Discord.MessageEmbed()
        .setTitle(video.title)
        .setColor('#CE2029')
        .setThumbnail(video.author.bestAvatar.url)
        .setImage(video.bestThumbnail.url)
        .setDescription(`> [Click here to watch!](${video.url})`)
        .setAuthor(video.author.name, video.author.bestAvatar.url, video.author.url)
        .addField("Views", video.views.toLocaleString(), true)
        .addField("Duration", video.duration, true)
        .addField("Uploaded At", video.uploadedAt, true)
        .setTimestamp()
        .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        
        return message.channel.send(youtubeEmbed)
        
    }
}