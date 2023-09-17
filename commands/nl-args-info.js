module.exports = {
    name: 'nl-args-info',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is argument info command",
    execute(message, args, cmd, client, Discord) {
        
        if (!args.length) {
            return message.channel.send(`${message.author}, You didn't provide any arguments!🧐\nCommand Format:\n\`!args-info [Any Argument]\``);
        }
        const argsEmbed = new Discord.MessageEmbed()
        .setColor('#9D7C8E')
        .setTitle('Command Arguments!')
        .addFields(
            { name: 'First Argument', value: `${args[0]}` },
            { name: 'Arguments', value: `${args}` },
            { name: 'Total Arguments', value: `${args.length}` }
        )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        message.channel.send(argsEmbed);
    }
}