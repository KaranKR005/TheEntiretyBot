const message = require("../events/guild/message");
const { execute } = require("./avatar");

module.exports = {
    name: 'binary',
    aliases: ['bn'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "Convert text into binary digits",
    async execute(message, args, cms, client, Discord) {
        if (!args[0]) return message.channel.send("Please specify weather you have to **encode** or **decode** a sentence, Command Format:\n\`!binary encode [sentence]\`\n\`!binary decode [binary digit]\`");

        let choice = ["encode", "decode"];
        if (!choice.includes(args[0].toLowerCase())) return message.channel.send('need to type a binary digit or any sentence to either **encode** or **decode** it, ommand Format:\n\`!binary encode [sentence]\`\n\`!binary decode [binary digit]\`');

        let text = args.slice(1).join(" ");
        if (!text) return message.channel.send("Please input some text.");

        // if (text.length > 1024) return message.channel.send("Ohh! that\'s way too much. The maximum character was 1,024.");

        function encode(char) {
            return char.split("").map(str => {
                const converted = str.charCodeAt(0).toString(2);
                return converted.padStart(8, "0");
            }).join(" ")
        };

        function decode(char) {
            return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
        };

        if (args[0].toLowerCase() === "encode") {
            // return message.channel.send(encode(text));
            const embed = new Discord.MessageEmbed()
            .setColor('#8077DE')
            .setTitle('Encoded!')
            .setDescription(encode(text))
            message.channel.send(embed);
        } else if (args[0].toLowerCase() === "decode") {
            return message.channel.send(decode(text));
        }

    }
}