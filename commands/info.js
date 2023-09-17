module.exports = {
    name: 'info',
    permissions: ["SEND_MESSAGES"],
    description: "This is a info command!",
    cooldown: 0,
    execute(message, args, cmd, client, Discord) {

        const third = args.join(" ");
        if (third) return;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#DAA520')
	    .setTitle('Bot-info Command!')
        .setAuthor('Karan Ram', 'https://i0.wp.com/i.imgur.com/ie929wr.png', ' https://discord.com/oauth2/authorize?client_id=827874200394924082&scope=bot&permissions=8589934591')
        .setDescription('Information related to bot')
        .setThumbnail('https://i0.wp.com/i.imgur.com/ie929wr.png')
	
	    .addFields(
		    { name: 'Bot Developer', value: 'Karan Ram' },
	    	{ name: 'Name of The Bot', value: 'TheEntiretyBot'},
	    	{ name: 'Version', value: '1.9.8',inline: true },
            { name: 'Library', value: 'Discord.js', inline: true},
            { name: 'Prefix', value: '!', inline: true}
    	)
        .addField('Invite bot to server', `[Click here to invite TheEntiretyBot to your server!](https://discord.com/oauth2/authorize?client_id=827874200394924082&scope=bot&permissions=8589934591)`, true)
        .setImage('https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        .setTimestamp()
	    .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
    


        message.channel.send(newEmbed);
    }
}