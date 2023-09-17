const { DiscordAPIError } = require("discord.js");
const pagination = require("discord.js-pagination");
// const recon = require('reconlx');
// const ReactionPages = recon.ReactionPages;
const ms = require('ms');
const { search } = require("node-superfetch");
module.exports = {
    name: 'help',
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a time pass command",
    async execute(message, args, cmd, client, Discord) {
        const third = args.slice(1).join(" ");
        if (third) return;
        if (!args[0]) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#76790C')
                .setTitle('Help Command!')
                .setDescription('Here are the category of commands!')

                .addFields(
                    { name: 'Basic & Fun Commands', value: '**```Bot & author info and fun commands.\nCMD : !help command```**' },
                    { name: 'Moderator', value: '**```Moderation commands related to kick, ban, mute, tempban & etc.\nCMD : !help moderation```**' },
                    { name: 'Music', value: '**```Music commands related to play, pause, skip, stop & etc.\nCMD : !help music```**' },
                    { name: 'Search', value: '**```Commands related to Google search, wikipedia, weather, etc.\nCMD : !help search```**' },
                    { name: 'Social Media', value: '**```Commands related to social media, youtube, meme, instagram, reddit, etc.\nCMD: !help media```**' })
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

            message.channel.send(helpEmbed);
        }


        else if (args[0] === 'command') {
            const commandEmbed = new Discord.MessageEmbed()
                .setColor('#FC6C85')
                .setTitle('**Commands!**')
                .setDescription('**Here are some of the commands!**')
                .addFields(
                    { name: '\`help\`', value: '_Information about all the commands._' },
                    { name: '\`ping\`', value: '_Gives the ping of the network._' },
                    { name: '\`server\`', value: '_Minor information of server._' },
                    { name: '\`user-info\`', value: '_Information about user itself._' },
                    { name: '\`args-info\`', value: '_Information on arguments that you have typed!_' },
                    { name: '\`info\`', value: '_Info on Bot Developer, Bot, Library, etc._' },
                    { name: '\`say\`', value: '_This command repeates the argument that you say._' },
                    { name: '\`calculate\`', value: '_Calculates the mathematical integers._' },
                    { name: 'Fun Commands', value: '_\`beep, avatar,\`\n\`hello (optional message).\`_' },
                    { name: 'Level System', value: '_\`!rank - To know your rank in the server\`\n\`!leaderboard - To know the server\'s top 5 highest rank member\`\n\`!xpedit - This command changes the xp to add, set and remove\`_' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

            message.channel.send(commandEmbed);
        }


        else if (args[0] === 'moderation') {
            const moderationEmbed1 = new Discord.MessageEmbed()
                .setColor('#d691ff')
                .setTitle('**Moderation Commands!**')
                .setDescription('**Here are some of the moderation commands!**')
                .addFields(
                    { name: '\`clear\`', value: '_This command is used to delete messages._' },
                    { name: '\`kick\`', value: '_This command kicks a member from the server._' },
                    { name: '\`ban\`', value: '_This command bans a member._' },
                    { name: '\`unban\`', value: '_You can unban the banned member using this command._' },
                    { name: '\`mute\`', value: '_You can mute anyone, the target will not be able to send messages._' },
                    { name: '\`unmute\`', value: '_This unmutes the muted member._' },
                    { name: '\`tempban\`', value: '_This command bans a member for a specific time period._' },
                    { name: '\`tempmute\`', value: '_This command mutes a member for a specific time period._' },
                    { name: '\`slowmode\`', value: '_This command creates a time gap in sending messages._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            const moderationEmbed2 = new Discord.MessageEmbed()
                .setColor('#d691ff')
                .setTitle('**Moderation Commands!**')
                .setDescription('**Here are some of the moderation commands!**')
                .addFields(
                    { name: '\`lock\`', value: '_You can lock the channel to prevent members from sending messages._' },
                    { name: '\`unlock\`', value: '_This command unlocks the locked channel._' },
                    { name: '\`nickname\`', value: '_This command changes the nickname of a member._' },
                    { name: '\`resetnick\`', value: '_This command resets changed nickname of mentioned user._' },
                    { name: '\`suggest\`', value: '_This command creates the suggestion of messages for voting._' },
                    { name: '\`giverole\`', value: '_Assigns role to member mentioned._'},
                    { name: '\`removerole\`', value: '_Removes roles to mentioned member._'},
                    { name: '\`nuke\`', value: '_This command deletes the active channel and recreates it with same properties._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            const pages = [
                moderationEmbed1,
                moderationEmbed2
            ]


            const emoji = ["⬅️", "➡️"]

            const timeout = '2073600000'

            pagination(message, pages, emoji, timeout)



        }


        else if (args[0] === 'music') {
            const musicEmbed = new Discord.MessageEmbed()
                .setColor('#A1DBFF')
                .setTitle('**Music Commands!**')
                .setDescription('**Here are some of the music commands!**')
                .addFields(
                    { name: '\`play\`', value: '_Plays the given music title._' },
                    { name: '\`skip\`', value: '_Skips the current music and plays the next music in the queue._' },
                    { name: '\`stop\`', value: '_This stops the music and clears the queue list._' },
                    { name: '\`pause\`', value: '_This command pause the current playing music._' },
                    { name: '\`resume\`', value: '_This command resume the paused music._' },
                    { name: '\`np\`', value: '_Gives the info on current playing song._' },
                    { name: '\`queue\`', value: '_This command gives the list of all songs in the queue._' },
                    { name: '\`clear-queue\`', value: '_clear the current queue in the server._' },
                    { name: '\`loop\`', value: '_Repeats the current playing song._' },
                    { name: '\`volume\`', value: ' _This command changes the volume of current playing music_' },
                    { name: '\`shuffle\`', value: '_Repeats the all the song present in queue._' },
                    { name: '**NOTE:**', value: 'This music command plays with FMTune bot not TheEntiretyBot\n\`You can turn off loop by executing **!loop** command again.\`' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(musicEmbed);
        }

        else if (args[0] === 'search') {
            const searchEmbed = new Discord.MessageEmbed()
                .setColor('#008972')
                .setTitle('**Search Commands!**')
                .setDescription('**Here are some of the search commands!**')
                .addFields(
                    { name: '\`google\`', value: '_Gives the image if the given search query with a little info._' },
                    { name: '\`wikipedia\`', value: '_Tells the short information on the query._' },
                    { name: '\`weather\`', value: '_Shows the weather info of a area mentioned._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(searchEmbed);
        }


        else if (args[0] === 'media') {
            const mediaEmbed = new Discord.MessageEmbed()
                .setColor('#994850')
                .setTitle('**Social Media Commands!**')
                .setDescription('**Here are some of the social media commands!**')
                .addFields(
                    { name: '\`meme\`', value: '_Shows the meme from various social media sites._' },
                    { name: '\`instagram\`', value: '_Shows the instagram profile info of the given person or organisation._' },
                    { name: '\`twitter\`', value: '_This command show the stats of mentioned twitter account._' },
                    { name: '\`reddit\`', value: '_Shows the reddit profile info of the given person._' },
                    { name: '\`youtube\`', value: '_Gives the channel info of a given youtube channel._' },
                    { name: '\`ytsearch\`', value: '_Shows the youtube video info of a given video name._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(mediaEmbed);
        }


        else if (args[0] === 'attachment') {
            const attachmentEmbed = new Discord.MessageEmbed()
                .setColor('#00FFF9')
                .setTitle('**Attachment Command!**')
                .setDescription('This command is not ready yet, we request you to wait for some time😕.')
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(attachmentEmbed);
        }
    }
}