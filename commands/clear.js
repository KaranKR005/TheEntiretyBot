module.exports = {
    name: 'clear',
    aliases: ['clean', 'erase', 'prune', 'delete', 'rough'],
    permissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    cooldown: 0,
    description: "This deletes the messages",
    execute(message, args, cmd, client) {
        const amount = parseInt(args[0]);
        const third = args.slice(1).join(" ");

        if (third) return;
        if (message.content.includes('-') || message.content.includes('+') || message.content.includes(',') || message.content.includes('.')) return message.channel.send('Invalid command!\nCommand Format: \`!clear [any number]\`');

        if (isNaN(amount)) {
            return message.reply('That doesn\'t seem to be a valid number.\nCommand Format: \`!clear [any number]\`');
        } else if (amount < 2 || amount > 100) {
            return message.reply('you need to input a number between **2** and **100**.');
        } message.channel.bulkDelete(amount, true).then(message.channel.send('clearing...').then(msg => {
            msg.edit('clearing...').then(msg => {
                msg.edit('clearing...').then(msg => {
                    msg.delete();
                })
            });
        })).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to clear messages in this channel!');
        });
    }
}
