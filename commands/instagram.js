const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: 'instagram',
    aliases: ['insta'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a instagram command",
    async execute(message, args, cmd, client, Discord) {
        message.channel.send("Sorry for inconvinience, this command is not available right now.")
    //     const username = args[0];

    //     const INSTAGRAM_API_BASE_URL = 'https://graph.instagram.com/v12.0';

    //     // Your Instagram Access Token
    //     const ACCESS_TOKEN = 'IGQWRPU3NxcW9VXzV3NlA2UWpPQ3d5R2hiY2ZAuZAlJjM3dDdGFFWkZA5TWs3NElrSUxnUzNfUENKQVp5alZA6Q29weXAwMDlZAWk1nUXJkY1hiVGdvUl9kYUVFMFBXQnVqUjc2Y29JS3B6cHNLNEVGbWdTQnVyci1FZAVkZD';
    //     const response = await axios.get(`${INSTAGRAM_API_BASE_URL}/${username}?fields=id,username,account_type,media_count,followers_count,follows_count,profile_picture_url,biography,name,website&access_token=${ACCESS_TOKEN}`);
                
    //     const details = response.data;
                
    //     const embed = new MessageEmbed()
    //         .setAuthor(`${details.username}`)
    //         .setColor('00a300')
    //         .setTitle(details.name)
    //         .setDescription(details.biography)
    //         .setThumbnail(details.profile_picture_url)
    //         .addField('Total Posts', details.media_count.toLocaleString(), true)
    //         .addField('Followers', details.followers_count.toLocaleString(), true)
    //         .addField('Following', details.follows_count.toLocaleString(), true)
    //         .addField('Website', details.website)
    //         .setTimestamp()
    //         .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
        
    //     await message.channel.send(embed)
    //     await message.channel.send('hello')

    }
}












        
        
    //     Example usage
    //     const username = args[0]; // Replace this with the Instagram username you want to fetch data for
        
    //     getInstagramData(username)
    //         .then(embed => {
    //             if (embed) {
    //                 console.log(embed);
    //                 // Send the embed to Discord channel or do something else with it
    //             } else {
    //                 // Handle the case where data couldn't be fetched
    //                 console.log('Failed to fetch Instagram data.');
    //             }
    //         });
    // }





//         message.channel.send('Sorry, This command is only available for limited time.\nTry contacting owner of this bot!')
//         if (!args[0]) {
//             return message.channel.send(`Please Enter a Channel Name`)
//         }
//         let url, response, account, details;
//         try {
//             url = `https://www.instagram.com/${args[0]}/?hl=en`;
//             response = await axios.get(url);
//             account = response.data;
//             if (account.graphql && account.graphql.user) {
//                 details = account.graphql.user;
//                 // Process details here
//             } else {
//                 console.error('Invalid response from Instagram API:', account);
//                 return message.channel.send('Invalid response from Instagram API');
//             }
//         } catch (error) {
//             console.error('Error fetching Instagram data:', error);
//             return message.channel.send('Error occurred while fetching Instagram data');
//         }
        
//         const embed = new MessageEmbed()
//             .setAuthor(`${details.is_verified ? `${details.username} ☑️` : ` ${details.username}`} ${details.is_private ? '🔒' : ''}`)
//             .setColor('00a300')
//             .setTitle(details.full_name)
//             .setDescription(details.biography)
//             .setThumbnail(details.profile_pic_url_hd)
//             .addField('Total Posts', details.edge_owner_to_timeline_media.count.toLocaleString(), true)
//             .addField('Followers', details.edge_followed_by.count.toLocaleString(), true)
//             .addField('Following', details.edge_follow.count.toLocaleString(), true)
//             .addField('Category', details.category_name)

//             .setTimestamp()
//             .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

//         await message.channel.send(embed)
//         console.log(embed)

//     }
// }