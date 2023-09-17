const Discord = require("discord.js");

module.exports = {
    name: 'unmute',
    aliases: [],
    permissions: ["MUTE_MEMBERS"],
    cooldown: 0,
    description: "This unmutes the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(1).join(" ");
        const { member, roles } = message;
        const muteRole = member.guild.roles.cache.find(r => r.name === 'Mute')
        const memberRole = member.guild.roles.cache.find(r => r.name === 'Member')

        // const muteRole = message.guild.roles.cache.get('831786998918414395');
        // const memberRole = message.guild.roles.cache.get('783319440447504395');
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!reason) reason = 'No reason given.';
        const unmuteEmbed = new Discord.MessageEmbed()
            .setTitle(`🔈 You have been unmuted in ${message.guild.name}`)
            .setDescription(`Reason for being unmuted: ${reason}`)
            .setColor('#5708ab')
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();

        const unmutedEmbed = new Discord.MessageEmbed()
        .setColor('#0085ff')
        .setDescription(`🔈 ${mentionedMember} has been unmuted successfully by ${message.author}.\nReason: \`${reason}\``);

        if (!args[0]) return message.channel.send('You must specify a member to unmute 📛.\nCommand Format: \`!unmute @use reason\`');
        if (!mentionedMember) return message.channel.send('☹️ The member stated is not in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot unmute yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot unmute me with my own command ☹️');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position) return message.channel.send('You cannot unmute that member because the person eko has muted them have higher permissions than you 😕.');
        if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This member is already unmuted 🙂.');

        await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
        await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err))//.then(message.channel.send('There was an issue muting the member.'));
        await mentionedMember.roles.remove(muteRole.id).then(message.channel.send(unmutedEmbed)).catch(err => console.log(err).then(message.channel.send('There was an issue in removing member from role.')));

    }
}