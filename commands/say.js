const { Message } = require("discord.js");

module.exports = {
    name: 'say',
    aliases: [],
    permissions: ["ATTACH_FILES"],
    cooldown: 0,
    description: "This command repeats a text",
    async execute(message, args, cmd, client, Discord) {
        const messageToSay = args.join(" ");
        if (!args[0]) return message.channel.send('You need to put your variables.\nCommand Format: \`!say [any sentence]\`')
        const sayEmbed = new Discord.MessageEmbed()
        .setColor('#DA9300')
        .setTitle(message.author.tag)
        .setDescription(`${messageToSay}`)
        .setTimestamp()
        .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        try {
            await message.channel.send(sayEmbed);
            message.delete();
        } catch (err) {
            console.log(err);
            message.channel.send('I am not able to say this command.');
        }
    }
}