module.exports = {
    name: 'testmode-on',
    aliases: ['start-test'],
    karanOnly: true,
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a test Command",
    execute(message, args, cmd, client, Discord) {
        const test_on = new Discord.MessageEmbed()
        .setColor('#FF9333')
        .setTitle('Test mode activated!')

        .setTimestamp()
	    .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
        message.channel.send(test_on);

    }
}