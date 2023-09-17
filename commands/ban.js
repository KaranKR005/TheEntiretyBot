const Discord = require('discord.js');
const { DiscordAPIError } = require('discord.js');
module.exports = {
    name: 'ban',
    aliases: [],
    permissions: ["BAN_MEMBERS", "ADMINISTRATOR"],
    cooldown: 0,
    description: "This bans a member",
    async execute(message, args, cmd, client, Discord) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('My role does not have the ban permission!');
        let reason = args.slice(1).join(" ");
        const mentionedMember = message.mentions.members.first();

        if (!reason) reason = 'No reason given.';
        if (!args[0]) return message.channel.send('You must specify a member to ban 📛.\nCommand Format: \`!ban @user reason\`');
        if (!mentionedMember) return message.channel.send('☹️ The member mentioned is not present in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot ban yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot ban me with my own command! 😡');
        if (mentionedMember.user.id == message.guild.owner.user.id) return message.channel.send(`You cannot ban the Owner of ${message.guild.name}`);
        if (!mentionedMember.bannable) return message.channel.send('You cannot ban a moderator! ⛔\nIf you are not able to ban members, type \`!modhelp\`');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position && message.author.id !== '747042752415531021' && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot ban that member because they have higher permissions than you 😕.');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot ban my developer at all 😡')

        const bannedEmbed = new Discord.MessageEmbed()
        .setColor('#d20000')
        .setDescription(`🚫 Successfully banned ${mentionedMember.user.tag} from ${message.guild.name} by ${message.author}.\nReason: \`${reason}\``);

        const banEmbed = new Discord.MessageEmbed()
        .setColor('#d20000')
        .setTitle(`🚫 You have been banned from ${message.guild.name}`)
        .setDescription(`Reason for being Banned: ${reason}`)
        .setTimestamp()
        .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

        await mentionedMember.send(banEmbed).catch(err => console.log(err));
        await mentionedMember.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send(bannedEmbed));
    }
}
