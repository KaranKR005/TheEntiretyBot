const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: 'instagram',
    aliases: ['insta'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a instagram command",
    async execute(message, args, cmd, client, Discord) {
        message.channel.send('Sorry, This command is only available for limited time.\nTry contacting owner of this bot!')
        // if (!args[0]) {
    //         return message.channel.send(`Please Enter a Channel Name`)
    //     }
    //     let url, response, account, details;
    //     try {
    //         url = `https://instagram.com/${args[0]}/?__a=1`;
    //         response = await axios.get(url)
    //         account = response.data
    //         details = account.graphql.user
    //     } catch (error) {
    //         return message.channel.send('User not found!')
    //     }
    //     const embed = new MessageEmbed()
    //         .setAuthor(`${details.is_verified ? `${details.username} ☑️` : ` ${details.username}`} ${details.is_private ? '🔒' : ''}`)
    //         .setColor('00a300')
    //         .setTitle(details.full_name)
    //         .setDescription(details.biography)
    //         .setThumbnail(details.profile_pic_url_hd)
    //         .addField('Total Posts', details.edge_owner_to_timeline_media.count.toLocaleString(), true)
    //         .addField('Followers', details.edge_followed_by.count.toLocaleString(), true)
    //         .addField('Following', details.edge_follow.count.toLocaleString(), true)
    //         .addField('Category', details.category_name)

    //         .setTimestamp()
    //         .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

    //     await message.channel.send(embed)
        
    }
}