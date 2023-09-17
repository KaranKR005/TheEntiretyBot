module.exports = {
    name: 'modhelp',
    devOnly: false,
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a ban help Command",
    execute(message, args, cmd, client, Discord) {
        const third = args.join(" ");
        if (third) return;

        const modEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('If you are not able to use moderation commands properly, It could be due to my highest role is **too low** in the hierarchy.\nTo solve it you need to put **my role** on top of all roles in the hierarchy.')
        message.channel.send(modEmbed)
    }
}