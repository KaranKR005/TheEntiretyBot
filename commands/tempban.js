const ms = require('ms');
const Discord = require("discord.js");


module.exports = {
    name: 'tempban',
    aliases: ['tban'],
    permissions: ["BAN_MEMBERS", "ADMINISTRATOR"],
    cooldown: 0,
    description: "This tempbans the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(2).join(" ");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let time = args[1];
        if (!reason) reason = 'No reason given.';

        if (!args[0]) return message.channel.send('You must specify a member to tempban with a duration of time 📛.\nCommand Format: \`!tempban @member <time> <reason>\`');
        if (!mentionedMember) return message.channel.send('☹️ The member stated is not in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot ban yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot ban me with my own command');
        if (!mentionedMember.bannable) return message.channel.send('You cannot ban a moderator! ⛔\nIf you are not able to ban members, type \`!modhelp\`');
        if (message.member.roles.highest.position < mentionedMember.roles.highest && message.author.id !== '747042752415531021' && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot ban that member because they have higher permissions than you 😕.');
        if (!time) return message.channel.send('You must state a duration of time.\nCommand Format: \`!tempban @member <time> <reason>\`');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot ban my developer at all 😡')



        
        const tempbannedembed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`🚫 Successfully tempbanned ${mentionedMember} from ${message.guild.name} by ${message.author} for ${time}\nReason: \`${reason}\``);

        const banEmbed = new Discord.MessageEmbed()
            .setTitle(`🚫 You have been temporarily banned from ${message.guild.name}`)
            .setColor('#d20000')
            .addFields(
                {name: 'Duration:', value: `${time}`},
                {name: 'Reason:', value: `${reason}`}
                )
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();

        
        await mentionedMember.send(banEmbed).catch(err => console.log(err));
        await mentionedMember.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send(tempbannedembed));

        setTimeout(async function () {
            await message.guild.fetchBans().then(async bans => {
                if (bans.size == 0) return message.channel.send('This guild does not have any bans.');
                let bannedUser = bans.find(b => b.user.id == mentionedMember.id);
                if (!bannedUser) return console.log('Member unbanned');
                await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
            });
        }, ms(time));
    }
}
