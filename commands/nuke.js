module.exports = {
    name: 'nuke',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    cooldown: 0,
    description: "This command recreates the server",
    async execute(message, args, cmd, client) {
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('My role doesn\'t have manage channel permissions to yse this command');
        let reason = args.join(" ");
        const nukeChannel = message.channel;

        if (!reason) reason = "No reason given";
        if (!nukeChannel.deletable) return message.channel.send('This channel is not deletable');

        await nukeChannel.clone().catch(err => console.log(err));
        await nukeChannel.delete(reason).catch(err => console.log(err));

    }
}
