module.exports = {
    name: 'server-list',
    aliases: ['sl', 'test', 'server-list'],
    permissions: ["SEND_MESSAGES"],
    karanOnly: true,
    cooldown: 0,
    description: "This is a test Command",
    execute(message, args, cmd, client, Discord) {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} | ${guild.id}`);
        })

    }

}
