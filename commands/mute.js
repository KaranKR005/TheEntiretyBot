const Discord = require("discord.js");

module.exports = {
    name: 'mute',
    aliases: [],
    permissions: ["MUTE_MEMBERS"],
    cooldown: 0,
    description: "This mutes the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(1).join(" ");
        const { member, roles } = message;
        const muteRole = member.guild.roles.cache.find(r => r.name === 'Mute')
        const memberRole = member.guild.roles.cache.find(r => r.name === 'Member')
        // const muteRole = message.guild.roles.cache.get('831786998918414395');
        // const memberRole = message.guild.roles.cache.get('783319440447504395');
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!reason) reason = 'No reason given.';

        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`🔇 You have been muted in ${message.guild.name}`)
            .setDescription(`Reason for being muted: ${reason}`)
            .setColor('#bdff00')
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();


            const mutedembed = new Discord.MessageEmbed()
            .setColor('#0051ff')
            .setDescription(`🔇 ${mentionedMember} has been muted successfully by ${message.author}\nReason: \`${reason}\``);
            

        if (!args[0]) return message.channel.send('You must specify a member to mute 📛.\nCommand Format: \`!mute @member <reason>\`');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server ☹️.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot mute me with my own command');
        if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This member is already muted 🔇.');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot mute that member because they have higher permissions than you 😕.');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot mute my developer at all 😡')

        await mentionedMember.send(muteEmbed).catch(err => console.log(err));
        await mentionedMember.roles.add(muteRole.id).then(message.channel.send(mutedembed)).catch(err => console.log(err).then(message.channel.send('There was an issue muting the member.')));
        await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue in removing member from role.')));
    }
}