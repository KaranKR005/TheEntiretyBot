module.exports = {
    name: 'ping',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a Ping Command",
    execute(message, args, cmd, client) {

        const third = args.join(" ");
        if (third) return;

        message.channel.send('Finding Bot\'s ping...').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit('Finding Bot\'s ping...').then(msg => {
                msg.edit('Finding Bot\'s ping...').then(msg => {
                    msg.edit(`Bot\'s ping is **${ping}ms**`);
                })
            });
        })
    }
}