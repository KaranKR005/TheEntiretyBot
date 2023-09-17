const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'calculate',
    aliases: ['calc', 'cal'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This command calculaes a coefficient",
    execute(message, args, cmd, client, Discord) {
        const firstValue = Number(args[0]);
        const secondValue = Number(args[2]);
        const third = args.slice(3).join(" ");

        if (third) return;
        if (!args[0]) return message.channel.send(`You need to input more values to calculate 🔢.\nCommand Format:\n\`!calculate <number> [+, -, x, /] <number>\``);
        if (!firstValue) return message.channel.send('The first value stated is not a number✖🔢✖.');
        if (!args[1]) return message.channel.send('➕ You need to state what do you want to do with these numbers➖.\nOptions: \`+, -, x, /\`');
        if (!['+', '-', 'x', '/'].includes(args[1])) return message.channel.send('You did not stated the method to apply this numbers');
        if (!secondValue) return message.channel.send('The second value 🔢 stated is not a number.');
        let addresult = firstValue + secondValue;
        let subtractresult = firstValue - secondValue;
        let multiplyresult = firstValue * secondValue;
        let divideresult = firstValue / secondValue;


        const additionEmbed = new Discord.MessageEmbed()
        .setColor('#8b008b')
        .setTitle('Result')
        .addField(`${firstValue} + ${secondValue}`, `=**  ${addresult}**`)
        .setTimestamp();

        const subtractEmbed = new Discord.MessageEmbed()
        .setColor('#8b008b')
        .setTitle('Result')
        .addField(`${firstValue} - ${secondValue}`, `=**  ${subtractresult}**`)
        .setTimestamp();

        const multiplyEmbed = new Discord.MessageEmbed()
        .setColor('#8b008b')
        .setTitle('Result')
        .addField(`${firstValue} x ${secondValue}`, `=**  ${multiplyresult}**`)
        .setTimestamp();

        const divideEmbed = new Discord.MessageEmbed()
        .setColor('#8b008b')
        .setTitle('Result')
        .addField(`${firstValue} / ${secondValue}`, `=**  ${divideresult}**`)
        .setTimestamp();


        if (args[1] == '+') {
            message.channel.send(additionEmbed);
        }
        if (args[1] == '-') {
            message.channel.send(subtractEmbed);
        }
        if (args[1] == 'x') {
            message.channel.send(multiplyEmbed);
        }
        if (args[1] == '/') {
            message.channel.send(divideEmbed);
        }
    }
}