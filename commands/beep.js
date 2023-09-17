module.exports = {
    name: 'beep',
    devOnly: false,
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a beep Command",
    execute(message, args, cmd, client){
        const third = args.join(" ");
        if (third) return;
        message.channel.send('boop!');
    }
}