const fetch = require('node-superfetch');
const Discord = require('discord.js');


module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a youtube command",
    async execute(message, args, cmd, client, Discord) {
        let name = args.join(" ");
        if (!name) return message.channel.send("Please mention channel's name.");

        const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${process.env.YOUTUBEAPI}&maxResults=1&type=channel`).catch(() => message.channel.send('Unknown channel error.'));
        if (!channel.body.items[0]) return message.channel.send("No channel were found!");

        const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${process.env.YOUTUBEAPI}`).catch(() => message.channel.send("Unknown channel data error!"));

        const embed = new Discord.MessageEmbed()
            .setColor('#CE9160')
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setAuthor(channel.body.items[0].snippet.channelTitle, channel.body.items[0].snippet.thumbnails.high.url, `https://www.youtube.com/channel/${channel.body.items[0].id.channelId}`)
            .addField("Channel Name", channel.body.items[0].snippet.channelTitle, true)
            .addField("Channel Description", channel.body.items[0].snippet.description, true)
            .addField("Subscribers", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
            .addField("Total views", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
            .addField("Total Video(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
            .addField("Date Created", new Date(channel.body.items[0].snippet.publishedAt).toLocaleString(), true)
            .addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            
        return message.channel.send(embed).catch(err => console.log(err).then(console.log('error in finding the video')));
    }
}