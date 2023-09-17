module.exports = {
    name: 'suggest',
    aliases: ['sgst'],
    permissions: ["ADD_REACTIONS"],
    cooldown: 0,
    description: "This is a suggestion command",
    async execute(message, args, cmd, client, Discord) {
        let suggestion = args.join(' ');
        if (!args[0]) return message.channel.send('You must state something to suggest');
        const embed = new Discord.MessageEmbed()
            .setColor('#E63C5A')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(suggestion)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        message.channel.send(embed).then((msg) => {
            msg.react('👍');
            msg.react('👎');
            message.delete();
        });
    }
}