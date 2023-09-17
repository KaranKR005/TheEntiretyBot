const ms = require('ms');
const Discord = require("discord.js");


module.exports = {
    name: 'tempmute',
    aliases: ['tmute'],
    permissions: ["MUTE_MEMBERS"],
    cooldown: 0,
    description: "This tempmutes the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(2).join(" ");
        const { member, roles } = message;
        const muteRole = member.guild.roles.cache.find(r => r.name === 'Mute')
        const memberRole = member.guild.roles.cache.find(r => r.name === 'Member')

        // const muteRole = message.guild.roles.cache.get('831786998918414395');
        // const memberRole = message.guild.roles.cache.get('783319440447504395');
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let time = args[1];
        if (!reason) reason = 'No reason given.';

        const tempmuteEmbed = new Discord.MessageEmbed()
            .setTitle(`🔇 You have been temporarily muted in ${message.guild.name}`)
            .setColor('#bdff00')
            .addFields(
                {name: 'Duration:', value: `${time}`},
                {name: 'Reason:', value: `${reason}`}
                )
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();

        const tempmutedembed = new Discord.MessageEmbed()
        .setColor('#0051ff')
        .setDescription(`🔇 ${mentionedMember} has been successfully tempmuted by ${message.author} for ${time}\nReason: \`${reason}\``);


        const unmuteEmbed = new Discord.MessageEmbed()
        .setColor('#5708ab')
        .setTitle(`🔈You are now unmuted from ${message.guild.name}`)
        .setDescription(`Your mute has been lifted from ${message.guild.name}!`);



        if (!args[0]) return message.channel.send('You must specify a member to tempmute with a duration of time 📛.\nCommand Format: \`!tempmute @member <time> <reason>\`');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server ☹️.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('🙅 You cannot mute yourself.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot mute me with my own command ');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position  && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot tempmute that member because they have higher permissions than you 😕.');
        if (!time) return message.channel.send('You must state a duration of time.\nCommand Format: \`!tempmute @member <time> <reason>\`');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot mute my developer at all 😡')


        
        await mentionedMember.roles.add(muteRole.id).then(message.channel.send(tempmutedembed)).catch(err => console.log(err));
        await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
        await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));

        setTimeout(async function () {
            await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
            await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
            await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
        }, ms(time));
    }
}