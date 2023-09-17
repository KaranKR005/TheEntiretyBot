module.exports = {
    name: 'testmode-off',
    aliases: ['testmode'],
    karanOnly: true,
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a test Command",
    execute(message, args, cmd, client, Discord) {
        const test_off = new Discord.MessageEmbed()
        .setColor('#FF9333')
        .setTitle('Test completed Successfully.')
        .setDescription('TheEntiretyBot has been updated!!')
        .addFields(
		    { name: 'Author', value: 'Karan Ram' },
	    	{ name: 'Previous version', value: '1.9.7',inline: false },
            { name: 'New Version', value: '1.9.8', inline: false},
    	)
        .setTimestamp()
	    .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
        message.channel.send(test_off);

    }
}