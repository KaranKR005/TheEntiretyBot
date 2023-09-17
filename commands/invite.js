const pagination = require("discord.js-pagination");
module.exports = {
    name: 'invite',
    aliases: ['inv'],
    permissions: ['SEND_MESSAGES'],
    cooldown: 0,
    description: "This command sends the invite links",
    execute(message, args, cmd, client, Discord) {
        const serverInv = ' https://discord.gg/Vtt9Hs4gUM';
        const botinv = 'https://discord.com/api/oauth2/authorize?client_id=827874200394924082&permissions=8&scope=bot%20applications.commands';
        const fmtuneInv = 'https://discord.com/oauth2/authorize?client_id=847749572864245770&scope=bot&permissions=7583293393'
        const third = args.join(" ");
        if (third) return;

        const invEmbed = new Discord.MessageEmbed()
            .setColor('#F9B100')
            .setTitle('Invite Links')
            .addFields(
                { name: 'The Entirety Server', value: `[Click Here to Join](${serverInv})` },
                { name: 'TheEntiretyBot', value: `[Click Here to Invite](${botinv})` },
                { name: 'FMTune', value: `[Click Here to Invite](${fmtuneInv})` }
            )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

        const invlinksEmbed = new Discord.MessageEmbed()
            .setColor('#F9B100')
            .setTitle('Invite URLs')
            .addFields(
                { name: 'The Entirety Server URL', value: serverInv },
                { name: 'TheEntiretyBot URL', value: botinv },
                { name: 'FMTune', value: fmtuneInv }
            )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');


        const pages = [
            invEmbed,
            invlinksEmbed
        ]
        const emoji = ["⬅️", "➡️"]

        const timeout = '2073600000'

        pagination(message, pages, emoji, timeout)


        // message.channel.send(invEmbed + invlinksEmbed);

    }
}
