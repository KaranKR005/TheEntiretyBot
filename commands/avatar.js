module.exports = {
    name: 'avatar',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: " This gives the avatar info",
    execute(message, args, cmd, client, Discord) {

        const third = args.slice(1).join(" ");
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
        } else {
            user = message.author;
        }
        if (third) return;
        let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
        const embed = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`${user.tag}\'s avatar`)
            .setDescription(`[Avatar Url of ${user.tag}](${avatar})`)
            .setImage(avatar)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

        message.channel.send(embed);

    }
}