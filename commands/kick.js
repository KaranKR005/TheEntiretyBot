const Discord = require("discord.js");

module.exports = {
    name: 'kick',
    aliases: [],
    permissions: ['KICK_MEMBERS'],
    cooldown: 0,
    description: "This command kicks a member",
    async execute(message, args, cmd, client, Discord) {

       // if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You do not have enough permissions to kick someone.');

        const mentionedMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given";

        const kickEmbed = new Discord.MessageEmbed()
            .setColor('#d20000')
            .setTitle(`📤 You were kicked from ${message.guild.name}`)
            .setDescription(`Reason for being kicked: ${reason}`)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');




        if (!args[0]) return message.channel.send('You must specify a member to kick 📛.\nCommand Format: \`!kick @user reason\`');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot kick yourself.');
        if (!mentionedMember) return message.channel.send('☹️ The member mentioned is not present in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot kick yourself 🙅.');
        if (mentionedMember.user.id == message.guild.owner.user.id) return message.channel.send(`You cannot kick the Owner of ${message.guild.name}`);
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot kick me with my own command.');
        if (!mentionedMember.kickable) return message.channel.send('You cannot kick a moderator! ⛔\nIf you are not able to kick members, type \`!modhelp\`');
       //if (message.member.roles.highest.position < mentionedMember.roles.highest.position && message.author.id !== '747042752415531021' && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot kick that member because they have higher permissions than you 😕.');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot kick my developer at all 😡')

        const kickedembed = new Discord.MessageEmbed()
            .setColor('#743a3a')
            .setDescription(`📤 Successfully kicked ${mentionedMember.user.tag} from ${message.guild.name} by ${message.author}\nReason: \`${reason}\``);


        await mentionedMember.send(kickEmbed).catch(err => console.log(err));
        await mentionedMember.kick({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send(kickedembed));

    }
}
