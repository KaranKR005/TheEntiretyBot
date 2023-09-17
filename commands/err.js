module.exports = {
    name: 'errcheck',
    aliases: ['error'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 2,
    description: "This is a hello Command",
    execute(messag, args, cmd, client, Discord){
        const third = args.join(" ");
        if (third) return;

        message.channel.send('Done');
    }
}