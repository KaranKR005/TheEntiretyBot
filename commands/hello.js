module.exports = {
    name: 'hello',
    aliases: ['helo', 'hii', 'hi', 'hey'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a hello Command",
    execute(message, args, cmd, client) {
        let text = args.join(" ");

        let helloMessage = `Hey ${message.author}! How are you? I am TheEntiretyBot.\nAt your Service all the time : )`
        
        if (!text) {
            return message.channel.send(helloMessage);
        } else {
            message.channel.send(helloMessage);
        }
    }
}