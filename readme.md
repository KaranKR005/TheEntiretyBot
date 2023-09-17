{
    "name": "discord-bot",
    "version": "1.0.0",
    "description": "Bot for my works.",
    "main": "main.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Karan Ram",
    "license": "ISC",
    "dependencies": {
      "@discordjs/opus": "^0.5.3",
      "accesscontrol": "^2.2.1",
      "axios": "^0.21.4",
      "canvacord": "^5.4.8",
      "canvas": "^2.10.2",
      "common-tags": "^1.8.2",
      "dateformat": "^4.6.3",
      "discord-auto-role": "^2.0.0",
      "discord-canvas": "^1.5.2",
      "discord-rpc": "^4.0.1",
      "discord-xp": "^1.1.16",
      "discord.js": "^12.5.3",
      "discord.js-commando": "^0.12.3",
      "discord.js-pagination": "^1.0.3",
      "dotenv": "^10.0.0",
      "fetch": "^1.1.0",
      "ffmpeg-static": "^4.4.1",
      "fs": "^0.0.1-security",
      "moment": "^2.29.4",
      "mongoose": "^5.13.15",
      "ms": "^2.1.3",
      "mute": "^2.0.6",
      "node-fetch": "^2.6.7",
      "node-superfetch": "^0.2.3",
      "reconlx": "^1.4.511",
      "weather-js": "^2.0.0",
      "yt-search": "^2.10.3",
      "ytdl-core": "^4.11.2",
      "ytsr": "^3.8.0"
    }
  }
  Worker: node main.js
  const mongoose = require("mongoose");
const mongoPath = process.env.MONGOPATH;

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}
const Discord = require("discord.js");
const client = new Discord.Client();  //{ partials: ["MESSAGE", "CHANNEL", "REACTION"] }
const role = require("discord-auto-role");
require('dotenv').config();
const mongoose = require("mongoose");
var mute = require('mute');
const Levels = require("discord-xp");
const RPC = require("discord-rpc");

Levels.setURL(process.env.MONGOPATH);

const memberCounter = require('./counters/member-counter');
const botActivity = require('./events/client/Activity');
const welcome = require('./events/client/welcome');
const leave = require('./events/client/leave');
const mongo = require('./mongo');
const joinrole = require('./events/client/joinrole');

client.on('ready', async () => {
    welcome(client);
    leave(client);
    memberCounter(client);
    joinrole(client);
    botActivity(client);
    await mongo().then(async (mongoose) => {
        try {
            console.log('Connected to DataBase!')
        } finally {
            mongoose.connection.close()
        }
            
    })
});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.DISCORD_TOKEN);
node_modules
DISCORD_TOKEN = ODI3ODc0MjAwMzk0OTI0MDgy.YGhX7g.4tBhpWUd7Gy-h8TvDOMY-C9UbYQ
PREFIX = !
YOUTUBEAPI = AIzaSyCULsTzWUO_fBw_6UpY9Etk8lt-lcUz798
TWITBEARER = AAAAAAAAAAAAAAAAAAAAAI9oPQEAAAAAAb1Bi2PCO0U2lAVCz1hYC9C80mw%3DuDmyR5vst0Yh1uLQeE939UCML8UGkevHSg6juvoaHTyWo09K0D
GOOGLEKEY = AIzaSyCLnYlAiFwXWdcP7xm2z6VYut-w-55EFxw
GOOGLECSX = 0e6de8e2ce6d6b4e8
MONGOPATH = mongodb+srv://Karan-ram:Karan7273@theentiretybot.ztnaize.mongodb.net/?retryWrites=true&w=majority


// const mongoose = require('mongoose');

// const balanceSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     userID: String,
//     guildID: String,
//     lastEdited: String,
//     balance: { type: Number, default: 0 }
// });

// module.exports = new mongoose.model('Balance', balanceSchema, 'balances');

const fs = require('fs');

module.exports = (client, Discord) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for (const file of command_files) {
        const command = require(`../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}

const fs = require('fs');


module.exports = (client, Discord) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of event_files) {
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
        }
    }
    ['client', 'guild'].forEach(e => load_dir(e));
    
}

module.exports = (client) => {
    client.user.setActivity("!help", {
        type: "LISTENING",
        url: "https://discord.gg/Vtt9Hs4gUM"

    });
}
const Discord = require("discord.js");
module.exports = (client) => {


    client.on('guildMemberAdd', async (member) => {
        if (member.guild.id === '783217517455605810') {

            let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Member')
            member.roles.add(welcomeRole)
        } else {
            return;
        }

    })
}
const Discord = require("discord.js");
const Canvas = require("discord-canvas");
const MessageAttachment = require("discord.js");

module.exports = (client) => {

    let leaveChannel = '840134723858726912';

    client.on('guildMemberRemove', async (member) => {
        if (member.guild.id == '783217517455605810') {
            const user = member.user;
            const server = member.guild;

            const image1 = await new Canvas.Goodbye()
                .setUsername(user.username)
                .setDiscriminator(user.discriminator)
                .setMemberCount(server.memberCount)
                .setGuildName(server.name)
                .setAvatar(user.displayAvatarURL({ format: "png", dynamic: true }))
                .setColor("border", "#8015EA")
                .setColor("username-box", "#8015EA")
                .setColor("discriminator-box", "#8015EA")
                .setColor("message-box", "#8015EA")
                .setColor("title", "#8015EA")
                .setColor("avatar", "#ffffff")
                .setBackground("https://i.ytimg.com/vi/HlMESVM7Lf0/maxresdefault.jpg")
                .toAttachment();

            const attachment = new Discord.MessageAttachment(image1.toBuffer(), "goodbye-image.png");
            const channel = member.guild.channels.cache.get(leaveChannel)
            channel.send(attachment);
            user.send(attachment)//.catch(console.log(error));
        } else {
            return;
        }

    })
}

module.exports = () => {
    console.log('TheEntiretyBot is online!');
}

const Discord = require("discord.js");
const Canvas = require("discord-canvas");
const MessageAttachment = require("discord.js");

module.exports = (client) => {
    let welcomeChannel = '840600796088631316'

    client.on('guildMemberAdd', async (member) => {
        if (member.guild.id === '783217517455605810' || '864021290578346035') {

            const user = member.user;

            const image = await new Canvas.Welcome()
                .setUsername(user.username)
                .setDiscriminator(user.discriminator)
                .setMemberCount(member.guild.memberCount)
                .setGuildName(member.guild.name)
                .setAvatar(user.displayAvatarURL({ format: "png", dynamic: true }))
                .setColor("border", "#FB7746")
                .setColor("username-box", "#EEB677")
                .setColor("discriminator-box", "#888582")
                .setColor("message-box", "#74EB5B")
                .setColor("title", "#F19D45")
                .setColor("avatar", "#FFFFFF")
                .setBackground("https://wallpapercave.com/wp/wp7044480.jpg")
                .toAttachment();

            const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
            const channel = member.guild.channels.cache.get(welcomeChannel)


            channel.send(attachment);
            user.send(attachment);

        } else {
            return;
        }

    })
}

require('dotenv').config();
const cooldowns = new Map();
const Levels = require('discord-xp');
module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/g);
    const cmd = args.shift().toLowerCase();


    Levels.setURL(process.env.MONGOPATH);

    const randomXp = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.member}, you leveled up to ${user.level}! Keep it going!`)
    }



    const command = client.commands.get(cmd) ||
        client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if (!command) return;


    const validPermissions = [
        "ADMINISTRATOR",
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]

    if (command.permissions.length) {
        if (message.author.id !== '747042752415531021') {
            let invalidPerms = []
            for (const perm of command.permissions) {
                if (!validPermissions.includes(perm)) {
                    return console.log(`Invalid Permissions: ${perm}`);
                }
                if (!message.member.hasPermission(perm)) {
                    invalidPerms.push(perm);

                }
            }
            if (invalidPerms.length) {
                return message.channel.send(`You don\'t have permission(s)!\nYou need \`${invalidPerms}\` permission(s) to execute the \`${prefix}${command.name}\` command.`);
            }
        }

    }

    if (command.cooldown) {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());

        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;

        if (time_stamps.has(message.author.id)) {
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

            if (current_time < expiration_time) {
                const time_left = (expiration_time - current_time) / 1000;

                return message.reply(`You have to wait for **${time_left.toFixed(1)} seconds** before using \`${prefix}${command.name}\` command again!`);
            }
        }

        time_stamps.set(message.author.id, current_time);
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    }


    if (command.devOnly == true && message.author.id !== message.guild.owner.user.id) {
        return message.channel.send(`\`${prefix}${command.name}\` is a Dev's command and only developer can use this command!`)
    }

    if (command.karanOnly == true && message.author.id !== '747042752415531021') {
        return message.channel.send(`Only Karan Ram can use \`${prefix}${command.name}\` command!\nSorry, you can't.`)
    }


    const { member } = message
    let errmsgChannel = '835486658552004608'
    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (err) {
        if (member.hasPermission("ADMINISTRATOR")) {
            message.reply(`There are some problem in executing \`${prefix}${command.name}\` command! You can check that error in ${member.guild.channels.cache
                .get(errmsgChannel)
                .toString()} channel.`)
        } else {
            message.reply(`There are some problem in executing \`${prefix}${command.name}\` command! ☹️`)
        }
        const errchannel = member.guild.channels.cache.get(errmsgChannel)
        errchannel.send(`\`${prefix}${command.name}\` - ${err}.`)
        console.log(err);
    }


}

module.exports = async (client) =>{
    const guild = client.guilds.cache.get('783217517455605810');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('834454503724941332');
        channel.setName(`Total Members - ${memberCount.toLocaleString()}`);
        // console.log('Updating Member Count');
     }, 5000);
}

module.exports = {
    name: 'args-info',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is argument info command",
    execute(message, args, cmd, client, Discord) {
        let text = args.join(" ");
        
        if (!args.length) {
            return message.channel.send(`${message.author}, You didn't provide any arguments!🧐\nCommand Format:\n\`!args-info [Any Argument]\``);
        }
        const argsEmbed = new Discord.MessageEmbed()
        .setColor('#9D7C8E')
        .setTitle('Command Arguments!')
        .setDescription(text)
        .addFields(
            { name: 'First Argument', value: `${args[0]}` },
            { name: 'Arguments', value: `${args}` },
            { name: 'Total Arguments', value: `${args.length}` }
        )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        message.channel.send(argsEmbed);
    }
}

module.exports = {
    name: 'avatar',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: " This gives the avatar info",
    execute(message, args, cmd, client, Discord) {

        const third = args.slice(1).join(" ");
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
        } else {
            user = message.author;
        }
        if (third) return;
        let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
        const embed = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`${user.tag}\'s avatar`)
            .setDescription(`[Avatar Url of ${user.tag}](${avatar})`)
            .setImage(avatar)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

        message.channel.send(embed);

    }
}

const Discord = require('discord.js');
const { DiscordAPIError } = require('discord.js');
module.exports = {
    name: 'ban',
    aliases: [],
    permissions: ["BAN_MEMBERS", "ADMINISTRATOR"],
    cooldown: 0,
    description: "This bans a member",
    async execute(message, args, cmd, client, Discord) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('My role does not have the ban permission!');
        let reason = args.slice(1).join(" ");
        const mentionedMember = message.mentions.members.first();

        if (!reason) reason = 'No reason given.';
        if (!args[0]) return message.channel.send('You must specify a member to ban 📛.\nCommand Format: \`!ban @user reason\`');
        if (!mentionedMember) return message.channel.send('☹️ The member mentioned is not present in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot ban yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot ban me with my own command! 😡');
        if (mentionedMember.user.id == message.guild.owner.user.id) return message.channel.send(`You cannot ban the Owner of ${message.guild.name}`);
        if (!mentionedMember.bannable) return message.channel.send('You cannot ban a moderator! ⛔\nIf you are not able to ban members, type \`!modhelp\`');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position && message.author.id !== '747042752415531021' && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot ban that member because they have higher permissions than you 😕.');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot ban my developer at all 😡')

        const bannedEmbed = new Discord.MessageEmbed()
        .setColor('#d20000')
        .setDescription(`🚫 Successfully banned ${mentionedMember.user.tag} from ${message.guild.name} by ${message.author}.\nReason: \`${reason}\``);

        const banEmbed = new Discord.MessageEmbed()
        .setColor('#d20000')
        .setTitle(`🚫 You have been banned from ${message.guild.name}`)
        .setDescription(`Reason for being Banned: ${reason}`)
        .setTimestamp()
        .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

        await mentionedMember.send(banEmbed).catch(err => console.log(err));
        await mentionedMember.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send(bannedEmbed));
    }
}


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


// const Commando = require("discord.js-commando");
// const axios = require("axios");
// module.exports = {
//     name: 'corona',
//     aliases: ['co'],
//     permissions: ['SEND_MESSAGES'],
//     cooldown: 0,
//     description: "This is a corona graph command",
//     async execute(message, args, cmd, client, Discord) {
//         const days = parseInt(args) || 30

//         const url = 'https://corona.lmao.ninja/v2'
//         let { data: results } = await axios.get(url)
//         results = results.slice(0, days)

//         // const labels = []
//         // const deaths = []
//         // const cases = []
//         // const recovered = []

//         // for (const result of results) {
//         //     let date = String(result.date)
//         //     const year = date.substring(0, 4)
//         //     const month = date.substring(4, 6)
//         //     const day = date.substring(6, 8)
//         //     labels.push(`${day}/${month}/${year}`)

//         //     deaths.push(result.death)
//         //     cases.push(result.positive)
//         //     recovered.push(result.recovered)
//         //     InICU.push(result.inIcuCurrently)
//         //     onVentilator.push(result. onVentilatorCurrently)
//         //     hospitalzed.push(result.hospitalized)
//         // }
//         console.log(results)

//     // const embed = new Discord.MessageEmbed()
//     // .setColor('#fb644c')
//     // .setTitle(args[0] ? `${args[0].toUpper}`)
//     }
// }

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

const Discord = require("discord.js");
const request = require("node-superfetch");
const { execute } = require("./info");
module.exports = {
    name: 'google',
    aliases: ['gg'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This command searchs google images",
    async execute(message, args, cmd, client, Discord) {
        let googleKey = process.env.GOOGLEKEY;
        let csx = process.env.GOOGLECSX;
        let query = args.join(" ");
        let result;

        if (!query) return message.channel.send("Please provide a name to get its image.");
        href = await search(query);
        if (!href) return message.channel.send("❌Unknown Search.❌");

        const embed = new Discord.MessageEmbed()
            .setColor('#3F3A96')
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
            .setURL(href.link)
            .setTimestamp()
            .setFooter('Powered by Google\nTheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

        return message.channel.send(embed);

        async function search(query) {
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: googleKey, cx: csx, safe: "off", q: query
            });

            if (!body.items) return null;
            return body.items[0];
        }

    }
}

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

const { DiscordAPIError } = require("discord.js");
const pagination = require("discord.js-pagination");
// const recon = require('reconlx');
// const ReactionPages = recon.ReactionPages;
const ms = require('ms');
const { search } = require("node-superfetch");
module.exports = {
    name: 'help',
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a time pass command",
    async execute(message, args, cmd, client, Discord) {
        const third = args.slice(1).join(" ");
        if (third) return;
        if (!args[0]) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#76790C')
                .setTitle('Help Command!')
                .setDescription('Here are the category of commands!')

                .addFields(
                    { name: 'Basic & Fun Commands', value: '**```Bot & author info and fun commands.\nCMD : !help command```**' },
                    { name: 'Moderator', value: '**```Moderation commands related to kick, ban, mute, tempban & etc.\nCMD : !help moderation```**' },
                    { name: 'Music', value: '**```Music commands related to play, pause, skip, stop & etc.\nCMD : !help music```**' },
                    { name: 'Search', value: '**```Commands related to Google search, wikipedia, weather, etc.\nCMD : !help search```**' },
                    { name: 'Social Media', value: '**```Commands related to social media, youtube, meme, instagram, reddit, etc.\nCMD: !help media```**' })
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

            message.channel.send(helpEmbed);
        }


        else if (args[0] === 'command') {
            const commandEmbed = new Discord.MessageEmbed()
                .setColor('#FC6C85')
                .setTitle('**Commands!**')
                .setDescription('**Here are some of the commands!**')
                .addFields(
                    { name: '\`help\`', value: '_Information about all the commands._' },
                    { name: '\`ping\`', value: '_Gives the ping of the network._' },
                    { name: '\`server\`', value: '_Minor information of server._' },
                    { name: '\`user-info\`', value: '_Information about user itself._' },
                    { name: '\`args-info\`', value: '_Information on arguments that you have typed!_' },
                    { name: '\`info\`', value: '_Info on Bot Developer, Bot, Library, etc._' },
                    { name: '\`say\`', value: '_This command repeates the argument that you say._' },
                    { name: '\`calculate\`', value: '_Calculates the mathematical integers._' },
                    { name: 'Fun Commands', value: '_\`beep, avatar,\`\n\`hello (optional message).\`_' },
                    { name: 'Level System', value: '_\`!rank - To know your rank in the server\`\n\`!leaderboard - To know the server\'s top 5 highest rank member\`\n\`!xpedit - This command changes the xp to add, set and remove\`_' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

            message.channel.send(commandEmbed);
        }


        else if (args[0] === 'moderation') {
            const moderationEmbed1 = new Discord.MessageEmbed()
                .setColor('#d691ff')
                .setTitle('**Moderation Commands!**')
                .setDescription('**Here are some of the moderation commands!**')
                .addFields(
                    { name: '\`clear\`', value: '_This command is used to delete messages._' },
                    { name: '\`kick\`', value: '_This command kicks a member from the server._' },
                    { name: '\`ban\`', value: '_This command bans a member._' },
                    { name: '\`unban\`', value: '_You can unban the banned member using this command._' },
                    { name: '\`mute\`', value: '_You can mute anyone, the target will not be able to send messages._' },
                    { name: '\`unmute\`', value: '_This unmutes the muted member._' },
                    { name: '\`tempban\`', value: '_This command bans a member for a specific time period._' },
                    { name: '\`tempmute\`', value: '_This command mutes a member for a specific time period._' },
                    { name: '\`slowmode\`', value: '_This command creates a time gap in sending messages._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            const moderationEmbed2 = new Discord.MessageEmbed()
                .setColor('#d691ff')
                .setTitle('**Moderation Commands!**')
                .setDescription('**Here are some of the moderation commands!**')
                .addFields(
                    { name: '\`lock\`', value: '_You can lock the channel to prevent members from sending messages._' },
                    { name: '\`unlock\`', value: '_This command unlocks the locked channel._' },
                    { name: '\`nickname\`', value: '_This command changes the nickname of a member._' },
                    { name: '\`resetnick\`', value: '_This command resets changed nickname of mentioned user._' },
                    { name: '\`suggest\`', value: '_This command creates the suggestion of messages for voting._' },
                    { name: '\`giverole\`', value: '_Assigns role to member mentioned._'},
                    { name: '\`removerole\`', value: '_Removes roles to mentioned member._'},
                    { name: '\`nuke\`', value: '_This command deletes the active channel and recreates it with same properties._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            const pages = [
                moderationEmbed1,
                moderationEmbed2
            ]


            const emoji = ["⬅️", "➡️"]

            const timeout = '2073600000'

            pagination(message, pages, emoji, timeout)



        }


        else if (args[0] === 'music') {
            const musicEmbed = new Discord.MessageEmbed()
                .setColor('#A1DBFF')
                .setTitle('**Music Commands!**')
                .setDescription('**Here are some of the music commands!**')
                .addFields(
                    { name: '\`play\`', value: '_Plays the given music title._' },
                    { name: '\`skip\`', value: '_Skips the current music and plays the next music in the queue._' },
                    { name: '\`stop\`', value: '_This stops the music and clears the queue list._' },
                    { name: '\`pause\`', value: '_This command pause the current playing music._' },
                    { name: '\`resume\`', value: '_This command resume the paused music._' },
                    { name: '\`np\`', value: '_Gives the info on current playing song._' },
                    { name: '\`queue\`', value: '_This command gives the list of all songs in the queue._' },
                    { name: '\`clear-queue\`', value: '_clear the current queue in the server._' },
                    { name: '\`loop\`', value: '_Repeats the current playing song._' },
                    { name: '\`volume\`', value: ' _This command changes the volume of current playing music_' },
                    { name: '\`shuffle\`', value: '_Repeats the all the song present in queue._' },
                    { name: '**NOTE:**', value: 'This music command plays with FMTune bot not TheEntiretyBot\n\`You can turn off loop by executing **!loop** command again.\`' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(musicEmbed);
        }

        else if (args[0] === 'search') {
            const searchEmbed = new Discord.MessageEmbed()
                .setColor('#008972')
                .setTitle('**Search Commands!**')
                .setDescription('**Here are some of the search commands!**')
                .addFields(
                    { name: '\`google\`', value: '_Gives the image if the given search query with a little info._' },
                    { name: '\`wikipedia\`', value: '_Tells the short information on the query._' },
                    { name: '\`weather\`', value: '_Shows the weather info of a area mentioned._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(searchEmbed);
        }


        else if (args[0] === 'media') {
            const mediaEmbed = new Discord.MessageEmbed()
                .setColor('#994850')
                .setTitle('**Social Media Commands!**')
                .setDescription('**Here are some of the social media commands!**')
                .addFields(
                    { name: '\`meme\`', value: '_Shows the meme from various social media sites._' },
                    { name: '\`instagram\`', value: '_Shows the instagram profile info of the given person or organisation._' },
                    { name: '\`twitter\`', value: '_This command show the stats of mentioned twitter account._' },
                    { name: '\`reddit\`', value: '_Shows the reddit profile info of the given person._' },
                    { name: '\`youtube\`', value: '_Gives the channel info of a given youtube channel._' },
                    { name: '\`ytsearch\`', value: '_Shows the youtube video info of a given video name._' }
                )
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(mediaEmbed);
        }


        else if (args[0] === 'attachment') {
            const attachmentEmbed = new Discord.MessageEmbed()
                .setColor('#00FFF9')
                .setTitle('**Attachment Command!**')
                .setDescription('This command is not ready yet, we request you to wait for some time😕.')
                .setTimestamp()
                .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            message.channel.send(attachmentEmbed);
        }
    }
}

module.exports = {
    name: 'info',
    permissions: ["SEND_MESSAGES"],
    description: "This is a info command!",
    cooldown: 0,
    execute(message, args, cmd, client, Discord) {

        const third = args.join(" ");
        if (third) return;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#DAA520')
	    .setTitle('Bot-info Command!')
        .setAuthor('Karan Ram', 'https://i0.wp.com/i.imgur.com/ie929wr.png', ' https://discord.com/oauth2/authorize?client_id=827874200394924082&scope=bot&permissions=8589934591')
        .setDescription('Information related to bot')
        .setThumbnail('https://i0.wp.com/i.imgur.com/ie929wr.png')
	
	    .addFields(
		    { name: 'Bot Developer', value: 'Karan Ram' },
	    	{ name: 'Name of The Bot', value: 'TheEntiretyBot'},
	    	{ name: 'Version', value: '1.9.8',inline: true },
            { name: 'Library', value: 'Discord.js', inline: true},
            { name: 'Prefix', value: '!', inline: true}
    	)
        .addField('Invite bot to server', `[Click here to invite TheEntiretyBot to your server!](https://discord.com/oauth2/authorize?client_id=827874200394924082&scope=bot&permissions=8589934591)`, true)
        .setImage('https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        .setTimestamp()
	    .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
    


        message.channel.send(newEmbed);
    }
}

const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: 'instagram',
    aliases: ['insta'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a instagram command",
    async execute(message, args, cmd, client, Discord) {
        message.channel.send('Sorry, This command is only available for limited time.\nTry contacting owner of this bot!')
        // if (!args[0]) {
    //         return message.channel.send(`Please Enter a Channel Name`)
    //     }
    //     let url, response, account, details;
    //     try {
    //         url = `https://instagram.com/${args[0]}/?__a=1`;
    //         response = await axios.get(url)
    //         account = response.data
    //         details = account.graphql.user
    //     } catch (error) {
    //         return message.channel.send('User not found!')
    //     }
    //     const embed = new MessageEmbed()
    //         .setAuthor(`${details.is_verified ? `${details.username} ☑️` : ` ${details.username}`} ${details.is_private ? '🔒' : ''}`)
    //         .setColor('00a300')
    //         .setTitle(details.full_name)
    //         .setDescription(details.biography)
    //         .setThumbnail(details.profile_pic_url_hd)
    //         .addField('Total Posts', details.edge_owner_to_timeline_media.count.toLocaleString(), true)
    //         .addField('Followers', details.edge_followed_by.count.toLocaleString(), true)
    //         .addField('Following', details.edge_follow.count.toLocaleString(), true)
    //         .addField('Category', details.category_name)

    //         .setTimestamp()
    //         .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

    //     await message.channel.send(embed)
        
    }
}

const pagination = require("discord.js-pagination");
module.exports = {
    name: 'invite',
    aliases: ['inv'],
    permissions: ['SEND_MESSAGES'],
    cooldown: 0,
    description: "This command sends the invite links",
    execute(message, args, cmd, client, Discord) {
        const serverInv = ' https://discord.gg/Vtt9Hs4gUM';
        const botinv = 'https://discord.com/api/oauth2/authorize?client_id=827874200394924082&permissions=8&scope=bot%20applications.commands';
        const fmtuneInv = 'https://discord.com/oauth2/authorize?client_id=847749572864245770&scope=bot&permissions=7583293393'
        const third = args.join(" ");
        if (third) return;

        const invEmbed = new Discord.MessageEmbed()
            .setColor('#F9B100')
            .setTitle('Invite Links')
            .addFields(
                { name: 'The Entirety Server', value: `[Click Here to Join](${serverInv})` },
                { name: 'TheEntiretyBot', value: `[Click Here to Invite](${botinv})` },
                { name: 'FMTune', value: `[Click Here to Invite](${fmtuneInv})` }
            )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

        const invlinksEmbed = new Discord.MessageEmbed()
            .setColor('#F9B100')
            .setTitle('Invite URLs')
            .addFields(
                { name: 'The Entirety Server URL', value: serverInv },
                { name: 'TheEntiretyBot URL', value: botinv },
                { name: 'FMTune', value: fmtuneInv }
            )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');


        const pages = [
            invEmbed,
            invlinksEmbed
        ]
        const emoji = ["⬅️", "➡️"]

        const timeout = '2073600000'

        pagination(message, pages, emoji, timeout)


        // message.channel.send(invEmbed + invlinksEmbed);

    }
}

const Discord = require("discord.js");

module.exports = {
    name: 'kick',
    aliases: [],
    permissions: ['KICK_MEMBERS'],
    cooldown: 0,
    description: "This command kicks a member",
    async execute(message, args, cmd, client, Discord) {

       // if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You do not have enough permissions to kick someone.');

        const mentionedMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given";

        const kickEmbed = new Discord.MessageEmbed()
            .setColor('#d20000')
            .setTitle(`📤 You were kicked from ${message.guild.name}`)
            .setDescription(`Reason for being kicked: ${reason}`)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');




        if (!args[0]) return message.channel.send('You must specify a member to kick 📛.\nCommand Format: \`!kick @user reason\`');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot kick yourself.');
        if (!mentionedMember) return message.channel.send('☹️ The member mentioned is not present in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot kick yourself 🙅.');
        if (mentionedMember.user.id == message.guild.owner.user.id) return message.channel.send(`You cannot kick the Owner of ${message.guild.name}`);
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot kick me with my own command.');
        if (!mentionedMember.kickable) return message.channel.send('You cannot kick a moderator! ⛔\nIf you are not able to kick members, type \`!modhelp\`');
       //if (message.member.roles.highest.position < mentionedMember.roles.highest.position && message.author.id !== '747042752415531021' && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot kick that member because they have higher permissions than you 😕.');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot kick my developer at all 😡')

        const kickedembed = new Discord.MessageEmbed()
            .setColor('#743a3a')
            .setDescription(`📤 Successfully kicked ${mentionedMember.user.tag} from ${message.guild.name} by ${message.author}\nReason: \`${reason}\``);


        await mentionedMember.send(kickEmbed).catch(err => console.log(err));
        await mentionedMember.kick({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send(kickedembed));

    }
}

const Levels = require('discord-xp');
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: " This gives the leaderboard of users",
    async execute(message, args, cmd, client, Discord) {
        const third = args.join(" ");
        if (third) return;

        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); // We grab top 5 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}**\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.


        const lbEmbed = new Discord.MessageEmbed()
        .setColor('#9E48AB')
        .setTitle('Leaderboard')
        .setDescription(lb.join("\n\n"))
        .setTimestamp()
        .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        message.channel.send(lbEmbed);
    }
}

const { TeamMember } = require("discord.js");

module.exports = {
    name: 'lock',
    aliases: ['taala'],
    permissions: ["MANAGE_CHANNELS"],
    cooldown: 0,
    description: "This is a channel lock command!",
    async execute(message, args, cmd, client, Discord) {
        const third = args.join(" ");
        if (third) return;
        const { member, roles } = message

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I don\'t have \`MANAGE_CHANNELS\` permission to lock this channel :metal:');
        const role = member.guild.roles.cache.find(role => role.name === 'Member');
        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: false
        }).catch(err => console.log(err));
        message.channel.send(`${message.author}, I have locked this channel 🔒`);
    }

}

const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'meme',
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a meme command",
    async execute(message, args, cmd, client, Discord) {
        const third = args.join(" ");
        if (third) return;

        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                const memeEmbed = new Discord.MessageEmbed()
                    .setColor('#468499')
                    .setTitle(json.title)
                    .setURL(json.postLink)
                    .setImage(json.url)
                    .setTimestamp()
                    .setFooter(`TheEntiretyBot | from: ${json.subreddit}`, 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
                message.channel.send(memeEmbed);
            });

    }
}

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

const Discord = require("discord.js");

module.exports = {
    name: 'mute',
    aliases: [],
    permissions: ["MUTE_MEMBERS"],
    cooldown: 0,
    description: "This mutes the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(1).join(" ");
        const { member, roles } = message;
        const muteRole = member.guild.roles.cache.find(r => r.name === 'Mute')
        const memberRole = member.guild.roles.cache.find(r => r.name === 'Member')
        // const muteRole = message.guild.roles.cache.get('831786998918414395');
        // const memberRole = message.guild.roles.cache.get('783319440447504395');
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!reason) reason = 'No reason given.';

        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`🔇 You have been muted in ${message.guild.name}`)
            .setDescription(`Reason for being muted: ${reason}`)
            .setColor('#bdff00')
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();


            const mutedembed = new Discord.MessageEmbed()
            .setColor('#0051ff')
            .setDescription(`🔇 ${mentionedMember} has been muted successfully by ${message.author}\nReason: \`${reason}\``);
            

        if (!args[0]) return message.channel.send('You must specify a member to mute 📛.\nCommand Format: \`!mute @member <reason>\`');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server ☹️.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot mute me with my own command');
        if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This member is already muted 🔇.');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot mute that member because they have higher permissions than you 😕.');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot mute my developer at all 😡')

        await mentionedMember.send(muteEmbed).catch(err => console.log(err));
        await mentionedMember.roles.add(muteRole.id).then(message.channel.send(mutedembed)).catch(err => console.log(err).then(message.channel.send('There was an issue muting the member.')));
        await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue in removing member from role.')));
    }
}

module.exports = {
    name: 'nickname',
    aliases: ['nn'],
    permissions: ["MANAGE_NICKNAMES"],
    cooldown: 0,
    description: "This command sets nickname",
    async execute(message, args, cmd, client, Discord) {
        let { member } = message;
        if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I require \`MANAGE_NICKNAMES\` Permissions to use \`!nickname\` command!");
        const third = args.slice(5).join(" ");
        if (third) return message.channel.send('This name is too long.');


        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const nickName = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send('You must specify a member to change nickname.\nCommand Format: \`!nickname @user [nickname]\`');
        if (!mentionedMember) return message.channel.send('The member mentioned is not in the server.');
        if (!nickName) return message.channel.send('You must state a nickname for the member');
        if (mentionedMember.user.id == message.guild.owner.user.id) return message.channel.send(`You cannot change the Owner's nickname`);
        if (mentionedMember.user.id == '827874200394924082' && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot change my nickname.');

        const embed = new Discord.MessageEmbed()
        .setColor('#87727F')
        .setDescription(`Nickname Successfully changed form **${mentionedMember.user.username}** to ${mentionedMember}!`);

        await mentionedMember.setNickname(nickName).then(message.channel.send(embed)).catch(err => console.log(err) && message.channel.send('There was an error in changing that member\'s nickname'));

    }
}

module.exports = {
    name: 'nl-args-info',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is argument info command",
    execute(message, args, cmd, client, Discord) {
        
        if (!args.length) {
            return message.channel.send(`${message.author}, You didn't provide any arguments!🧐\nCommand Format:\n\`!args-info [Any Argument]\``);
        }
        const argsEmbed = new Discord.MessageEmbed()
        .setColor('#9D7C8E')
        .setTitle('Command Arguments!')
        .addFields(
            { name: 'First Argument', value: `${args[0]}` },
            { name: 'Arguments', value: `${args}` },
            { name: 'Total Arguments', value: `${args.length}` }
        )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        message.channel.send(argsEmbed);
    }
}

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

module.exports = {
    name: 'args-info',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is argument info command",
    execute(message, args, cmd, client, Discord) {
        
        if (!args.length) {
            return message.channel.send(`${message.author}, You didn't provide any arguments!🧐\nCommand Format:\n\`!args-info [Any Argument]\``);
        }
        const argsEmbed = new Discord.MessageEmbed()
        .setColor('#9D7C8E')
        .setTitle('Command Arguments!')
        .addFields(
            { name: 'Total Arguments', value: `${args.length}` }
        )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        message.channel.send(argsEmbed);
    }
}

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

// const ytdl = require('ytdl-core');
// const ytSearch = require('yt-search');

// const queue = new Map();

// module.exports = {
//     name: 'play',
//     aliases: ['stop', 'skip'],
//     permissions: ["SEND_MESSAGES"],
//     cooldown: 0,
//     description: "Advanced music bot",
//     async execute(message, args, cmd, client, Discord) {


//         const voice_channel = message.member.voice.channel;
//         if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
//         const permissions = voice_channel.permissionsFor(message.client.user);
//         if (!permissions.has('CONNECT')) return message.channel.send('You don\'t have permission to use this command');
//         if (!permissions.has('SPEAK')) return message.channel.send('You don\'t have permission to use this command');

//         const server_queue = queue.get(message.guild.id);

//         // const pause = (message, server_queue) => {
//         //     if (server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused!");//Checks if the song is already paused.
//         //     server_queue.connection.dispatcher.pause();//If the song isn't paused this will pause it.
//         //     message.channel.send("Paused the song!");//Sends a message to the channel the command was used in after it pauses.
//         // }

//         // const resume = (message, server_queue) => {
//         //     if (!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");//Checks if the song isn't paused.
//         //     server_queue.connection.dispatcher.resume();//If the song is paused this will unpause it.
//         //     message.channel.send("Unpaused the song!");//Sends a message to the channel the command was used in after it unpauses.
//         // }

//         const skip_song = (message, server_queue) => {
//             message.channel.send('Skipped!  ⏭️');
//             if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
//             if (!server_queue) {
//                 return message.channel.send('There arge no songs in queue :pensive:');
//             }
//             server_queue.connection.dispatcher.end();
//         }

//         const stop_song = (message, server_queue) => {
//             if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
//             server_queue.songs = [];
//             server_queue.connection.dispatcher.end();
//         }



//         const video_player = async (guild, song) => {
//             const song_queue = queue.get(guild.id);

//             if (!song) {
//                 song_queue.voice_channel.leave();
//                 queue.delete(guild.id);
//                 return;
//             }
//             const stream = ytdl(song.url, { filter: 'audioonly' });
//             song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
//                 .on('finish', () => {
//                     song_queue.songs.shift();
//                     video_player(guild, song_queue.songs[0]);
//                 });

//             const playEmbed = new Discord.MessageEmbed()
//                 .setColor('ff922d')
//                 .setTitle('🎶 Now Playing 🎶')
//                 .setDescription(song.title)
//                 .setTimestamp()
//                 .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

//             await song_queue.text_channel.send(playEmbed)
//         }



//         if (cmd === 'play') {
//             if (!args.length) return message.channel.send('you need to send the second argument!');
//             let song = {};


//             if (ytdl.validateURL(args[0])) {
//                 const song_info = await ytdl.getInfo(args[0]);
//                 song = { title: song_info.videoDetails.title, URL: song_info.videoDetails.video_url }
//             } else {
//                 const video_finder = async (query) => {
//                     const videoResult = await ytSearch(query);
//                     return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
//                 }

//                 const video = await video_finder(args.join(''));
//                 if (video) {
//                     song = { title: video.title, url: video.url }
//                 } else {
//                     message.channel.send('Error in finding the video');
//                 }
//             }

//             if (!server_queue) {

//                 const queue_constructor = {
//                     voice_channel: voice_channel,
//                     text_channel: message.channel,
//                     connection: null,
//                     songs: []
//                 }

//                 queue.set(message.guild.id, queue_constructor);
//                 queue_constructor.songs.push(song);

//                 try {
//                     const connection = await voice_channel.join();
//                     queue_constructor.connection = connection;
//                     video_player(message.guild, queue_constructor.songs[0]);
//                 } catch (err) {
//                     queue.delete(message.guild.id);
//                     message.channel.send('There was an error in connecting! : (');
//                     throw err;
//                 }
//             } else {
//                 server_queue.songs.push(song);
//                 const queueembed = new Discord.MessageEmbed()
//                     .setColor('ff922d')
//                     .setTitle('Added to queue!')
//                     .setDescription(`${song.title}`)
//                     .setFooter(`Added by ` + message.author.tag)
//                     .setTimestamp()
//                 return message.channel.send(queueembed);
//             }
//         }

//         else if (cmd === 'skip') skip_song(message, server_queue);
//         else if (cmd === 'stop') stop_song(message, server_queue);
//         // else if (cmd === 'pause') stop_song(message, server_queue);
//         // else if (cmd === 'resume') stop_song(message, server_queue);


//     }
// }

// const Levels = require('discord-xp');
// const canvas = require('canvas');
// const data = require('canvacord/src/Plugins');
// const { createCanvas, loadImage } = require('canvas');
// const { UserFlags } = require('discord.js');
// // const { discordTime } = require('canvacord/typings/src/Util');
// module.exports = {
//     name: 'rank',
//     aliases: ['lvl'],
//     permissions: ["SEND_MESSAGES"],
//     cooldown: 0,
//     description: " This gives the level info",
//     async execute(message, args, cmd, client, Discord) {

//         const user = interaction.options.getUser("user") || interaction.user;
//         const datas = await users.find({ guild: interaction.guild.id }) || {}, data, rank;

//         datas.forEach((v, i) => {
//             2
//             data = v;
//             rank = i + 1;
//         });

//         let reqXP = 100;
//         for i 

//         const canvas = createCanvas(1000, 300);
//         const ctx = canvas.getContext('2d'),
//             bar_width = 600,
//             bg = await loadImage("https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg")
//         av = await loadImage(interaction.user.displayAvatarURL({ format: 'png', dynamic: 'false' }))
//         ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

//         ctx.beginPath();
//         ctx.arc(120, 120, 110, 0, 2 * Math.PI);
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = "white";
//         ctx.fill();
//         ctx.stroke();
//         ctx.closePath();

//         ctx.lineJoin = "round";
//         ctx.lineWidth = 69;
//         ctx.strokeRect(298, 199, bar_width,2);


//         ctx.strokeStyle = "black";
//         ctx.strokeRect(300, 200, bar_width, 0);


//         ctx.strokeStyle = "#1762e8"
//         ctx.strokeRect(300, 200, bar_width * data.xp / reqXP, 0);

//         ctx.beginPath();
//         ctx.arc(120, 120, 110, 0, 2 * Math.PI);
//         ctx.closePath();
//         ctx.clip();

//         ctx.drawImage(av, 10, 10, 220, 200)

//     }
// }























// // const { member } = message
// // const user = member.user;
// // let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
// // if (!mentionedMember) mentionedMember = message.member;

// // const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
// // const neededXp = Levels.xpFor(parseInt(target.level) + 1)

// // if (!target) return message.channel.send('The member stated Does not have any levels within the server.');

// // const rank = new canvacord.Rank()
// //     .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
// //     .setCurrentXP(target.xp, '#CFEE30')
// //     .setLevel(target.level)
// //     .setRank(1, 'RANK', false)
// //     .setRequiredXP(neededXp, '#280B2C')
// //     .setStatus(user.presence.status)
// //     .setProgressBar('#7AF900', "COLOR")
// //     .setUsername(user.username)
// //     .setDiscriminator(user.discriminator, 'FFFFFF')
// //     .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/845217298893242389/845515928015208448/The_Entirety_Server_1.jpg")

// // rank.build()
// //     .then(data => {
// //         const attachment = new Discord.MessageAttachment(data, 'rank.png')
// //         message.channel.send(attachment);
// //     })


const Discord = require("discord.js");
const request = require("node-superfetch");
module.exports = {
    name: 'reddit',
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a reddit command",
    async execute(message, ags, cmd, client, Discord) {
        // try {
        //     let user = args[0];
        //     if (!user) return message.channel.send('Please input the reddit username to get info about them');

        //     const { body } = await fetch(`https://www.reddit.com/${user}/about.json`);
        //     const { data } = body;

        //     if (data.hide_from_robots) return message.channel.send("This user is hidden :lock:");

        //     const embed = new Discord.MessageEmbed()
        //         .setColor('#008972')
        //         .setThumbnail(data.icon_img.replace(/(amp;)/gi, ""))
        //         .setURL(`https://www.reddit.com/user/${user}`)
        //         .setTitle(`${data.name}`)
        //         .addField("username", data.name, true)
        //         .addField("ID", data.id, true)
        //         .addField("Karma", Number(data.total_karma), true)
        //         .addField("Date Created", require("moment").utc(data.created_utc * 1000).format("MM/DD/YYYY h:mm A"), true)
        //         .addField("Gold/Premium?", data.is_gold ? "Yes." : "No.", true)
        //         .addField("Verified", Data.verified ? "Yes." : "No.", true)
        //     return message.channel.send(embed);
        // } catch (error) {
        //     if (error.status === 403) return message.channel.send("This user is either in private mode, or closed their account");
        //     else if (error.status === 404) return message.channel.send("User not found...!");
        //     else return message.channel.send(`An error occured: **${error.message}**`);
        // }

        message.channel.send('❗ There are some reddit server error in this command.\nThis will be fixed soon : )');
    }
}

module.exports = {
    name: 'resetnick',
    aliases: ['rnick'],
    permissions: ['MANAGE_NICKNAMES'],
    cooldown: 0,
    description: "This is a reset nickname command",
    async execute(message, args, cmd, client, Discord) {
        const third = args.slice(1).join(" ");
        if (third) return;
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('You must specify a member to reset their nickname.\nCommand Format: \`!resetnick @user\`');
        if (!mentionedMember) return message.channel.send('The member mentioned is not in the server.');

        const embed = new Discord.MessageEmbed()
        .setColor('ffc100')
        .setDescription(`${mentionedMember}'s Nickname has been Successfully reset!`);
       
        await mentionedMember.setNickname(null).then(message.channel.send(embed)).catch(err => console.log(err) && message.channel.send('There was an error in resetting that member\'s nickname!'));
        
    }
}

module.exports = {
    name: 'giverole',
    aliases: ['gr'],
    permissions: ["MANAGE_ROLES"],
    cooldown: 0,
    description: " This gives the avatar info",
    async execute(message, args, cmd, client, Discord) {

        const third = args.slice(1).join(" ");
        if (third) return;
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE ROLES\` permission to change users roles.');

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        if (!args[0]) return message.channel.send('You need to specify a member to assign role to them.\nCommand format: \`!giverole @user roleID\`');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
        if (mentionedMember.roles.highest.position > message.member.roles.highest.position) return message.channel.send(`You cannot roles to these users as there role is higher than you.`);
        if (!args[1]) return message.channel.send('You must state a role id to give the mentioned member.\nCommand format: \`!giverole @user roleID\`');
        if (!role) return message.channel.send('The role id stated does\'t exist.');
        if (message.member.roles.highest.position < role.position) return message.channel.send('You cannot assign this role as it is above of your current highest role.');

        await mentionedMember.roles.add(role.id).then(message.channel.send(`Role has been sucessfully assigned to ${mentionedMember}.`)).catch(err=> console.log(err));
    }
}

module.exports ={
    name: 'removerole',
    aliases: ['rr'],
    permissions: ["MANAGE_ROLES"],
    cooldown: 0,
    description: " This gives the avatar info",
    async execute(message, args, cmd, client, Discord) {
        const third = args.slice(1).join(" ");
        if (third) return;
    
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE ROLES\` permission to change users roles.');
    
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    
        if (!args[0]) return message.channel.send('You need to specify a member to remove their role.\nCommand format: \`!removerole @user roleID\`');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`You cannot remove roles to these users as there role is the same or higher than you.`);
        if (!args[1]) return message.channel.send('You must state a role id to remove from the mentioned member.\nCommand format: \`!removerole @user roleID\`');
        if (!role) return message.channel.send('The role id stated does\'t exist.');
        if (message.member.roles.highest.position <= role.position) return message.channel.send('You cannot remove this role as it is above of your current highest role.');
    
        await mentionedMember.roles.remove(role.id).then(message.channel.send(`Role has been sucessfully removed from ${mentionedMember}.`)).catch(err=> console.log(err));
    }
    }

    const { Message } = require("discord.js");

module.exports = {
    name: 'say',
    aliases: [],
    permissions: ["ATTACH_FILES"],
    cooldown: 0,
    description: "This command repeats a text",
    async execute(message, args, cmd, client, Discord) {
        const messageToSay = args.join(" ");
        if (!args[0]) return message.channel.send('You need to put your variables.\nCommand Format: \`!say [any sentence]\`')
        const sayEmbed = new Discord.MessageEmbed()
        .setColor('#DA9300')
        .setTitle(message.author.tag)
        .setDescription(`${messageToSay}`)
        .setTimestamp()
        .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        try {
            await message.channel.send(sayEmbed);
            message.delete();
        } catch (err) {
            console.log(err);
            message.channel.send('I am not able to say this command.');
        }
    }
}

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

const dateformat = require("dateformat");
module.exports = {
    name: 'server',
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This gives info about server",
    execute(message, args, cmd, client, Discord) {

        const third = args.join(" ");
        if (third) return;

        let icon = message.guild.iconURL({ size: 2048 });
        let region = {
            "brazil": "Brazil",
            "eu-central": "Central Europe",
            "singapore": "Singapore",
            "london": "London",
            "russia": "Russia",
            "japan": "Japan",
            "hongkong": "Hongkong",
            "sydney": "Sydney",
            "us-central": "U.S. Central",
            "us-east": "U.S. East",
            "india": "India",
            "us-south": "U.S. South",
            "us-west": "U.S. West",
            "eu-west": "Western Europe",
            "africa": "Africa",
            "australia": "Australia"
        }
        // let member = message.guild.members;
        let channels = message.guild.channels;
        let location = region[message.guild.region];

        let x = Date.now() - message.guild.createdAt;
        let h = Math.floor(x / 86400000)
        let created = dateformat(message.guild.createdAt);
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#C44513')
            .setThumbnail(icon)
            .setAuthor(message.guild.name, icon)
            .setDescription(`**ID:** ${message.guild.id}`)
            .addFields(
                { name: 'Server Name', value: `${message.guild.name}` },
                { name: 'Owner', value: `${message.guild.owner.user.tag}\n\`${message.guild.owner.user.id}\``, inline: true },
                { name: 'Region', value: location, inline: true },
                { name: 'Total Channels', value: `${channels.cache.size}`, inline: false },
                { name: 'Total Members', value: `${message.guild.memberCount}`, inline: false },
                { name: 'Date Created', value: `${created} \nsince **${h}** day(s)` }
            )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
        message.channel.send(newEmbed);
    }
}

module.exports = {
    name: 'slowmode',
    aliases: ['slow', 'slowmo'],
    permissions: ["MANAGE_CHANNELS"],
    cooldown: 0,
    description: 'This command enables slowmode',
    async execute(message, args, cmd, client) {

        const third = args.slice(1).join(" ");
        if (third) return;
        if (!args[0]) return message.channel.send('You did not mentioned a number in seconds to use slowmode.\nCommand format: \`!slowmode timeinseconds\`');
        if (args[0] === 'none') {
            await message.channel.setRateLimitPerUser(0);
            return message.channel.send('Set Slowdown to 0 seconds!');
        };
        if (isNaN(args[0])) return message.channel.send('Number stated is not a number.');
        const setTimeTo = Number(args[0]);

        if (setTimeTo === 5) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 10) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 15) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 30) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 60) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 120) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 300) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 600) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 900) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 1800) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };
        
        if (setTimeTo === 3600) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 7200) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 21600) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        message.channel.send('Invalid Time in seconds, Options:\n\`none, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200 and 21600\` seconds.')

    }
}


module.exports = {
    name: 'suggest',
    aliases: ['sgst'],
    permissions: ["ADD_REACTIONS"],
    cooldown: 0,
    description: "This is a suggestion command",
    async execute(message, args, cmd, client, Discord) {
        let suggestion = args.join(' ');
        if (!args[0]) return message.channel.send('You must state something to suggest');
        const embed = new Discord.MessageEmbed()
            .setColor('#E63C5A')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(suggestion)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        message.channel.send(embed).then((msg) => {
            msg.react('👍');
            msg.react('👎');
            message.delete();
        });
    }
}

const ms = require('ms');
const Discord = require("discord.js");


module.exports = {
    name: 'tempban',
    aliases: ['tban'],
    permissions: ["BAN_MEMBERS", "ADMINISTRATOR"],
    cooldown: 0,
    description: "This tempbans the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(2).join(" ");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let time = args[1];
        if (!reason) reason = 'No reason given.';

        if (!args[0]) return message.channel.send('You must specify a member to tempban with a duration of time 📛.\nCommand Format: \`!tempban @member <time> <reason>\`');
        if (!mentionedMember) return message.channel.send('☹️ The member stated is not in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot ban yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot ban me with my own command');
        if (!mentionedMember.bannable) return message.channel.send('You cannot ban a moderator! ⛔\nIf you are not able to ban members, type \`!modhelp\`');
        if (message.member.roles.highest.position < mentionedMember.roles.highest && message.author.id !== '747042752415531021' && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot ban that member because they have higher permissions than you 😕.');
        if (!time) return message.channel.send('You must state a duration of time.\nCommand Format: \`!tempban @member <time> <reason>\`');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot ban my developer at all 😡')



        
        const tempbannedembed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`🚫 Successfully tempbanned ${mentionedMember} from ${message.guild.name} by ${message.author} for ${time}\nReason: \`${reason}\``);

        const banEmbed = new Discord.MessageEmbed()
            .setTitle(`🚫 You have been temporarily banned from ${message.guild.name}`)
            .setColor('#d20000')
            .addFields(
                {name: 'Duration:', value: `${time}`},
                {name: 'Reason:', value: `${reason}`}
                )
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();

        
        await mentionedMember.send(banEmbed).catch(err => console.log(err));
        await mentionedMember.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send(tempbannedembed));

        setTimeout(async function () {
            await message.guild.fetchBans().then(async bans => {
                if (bans.size == 0) return message.channel.send('This guild does not have any bans.');
                let bannedUser = bans.find(b => b.user.id == mentionedMember.id);
                if (!bannedUser) return console.log('Member unbanned');
                await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
            });
        }, ms(time));
    }
}

const ms = require('ms');
const Discord = require("discord.js");


module.exports = {
    name: 'tempmute',
    aliases: ['tmute'],
    permissions: ["MUTE_MEMBERS"],
    cooldown: 0,
    description: "This tempmutes the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(2).join(" ");
        const { member, roles } = message;
        const muteRole = member.guild.roles.cache.find(r => r.name === 'Mute')
        const memberRole = member.guild.roles.cache.find(r => r.name === 'Member')

        // const muteRole = message.guild.roles.cache.get('831786998918414395');
        // const memberRole = message.guild.roles.cache.get('783319440447504395');
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let time = args[1];
        if (!reason) reason = 'No reason given.';

        const tempmuteEmbed = new Discord.MessageEmbed()
            .setTitle(`🔇 You have been temporarily muted in ${message.guild.name}`)
            .setColor('#bdff00')
            .addFields(
                {name: 'Duration:', value: `${time}`},
                {name: 'Reason:', value: `${reason}`}
                )
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();

        const tempmutedembed = new Discord.MessageEmbed()
        .setColor('#0051ff')
        .setDescription(`🔇 ${mentionedMember} has been successfully tempmuted by ${message.author} for ${time}\nReason: \`${reason}\``);


        const unmuteEmbed = new Discord.MessageEmbed()
        .setColor('#5708ab')
        .setTitle(`🔈You are now unmuted from ${message.guild.name}`)
        .setDescription(`Your mute has been lifted from ${message.guild.name}!`);



        if (!args[0]) return message.channel.send('You must specify a member to tempmute with a duration of time 📛.\nCommand Format: \`!tempmute @member <time> <reason>\`');
        if (!mentionedMember) return message.channel.send('The member stated is not in the server ☹️.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('🙅 You cannot mute yourself.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('😡 You cannot mute me with my own command ');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position  && message.author.id !== message.guild.owner.user.id) return message.channel.send('You cannot tempmute that member because they have higher permissions than you 😕.');
        if (!time) return message.channel.send('You must state a duration of time.\nCommand Format: \`!tempmute @member <time> <reason>\`');
        if (mentionedMember.user.id == '747042752415531021') return message.channel.send('You cannot mute my developer at all 😡')


        
        await mentionedMember.roles.add(muteRole.id).then(message.channel.send(tempmutedembed)).catch(err => console.log(err));
        await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
        await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));

        setTimeout(async function () {
            await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err));
            await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err));
            await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
        }, ms(time));
    }
}

module.exports = {
    name: 'testmode-off',
    aliases: ['testmode'],
    karanOnly: true,
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a test Command",
    execute(message, args, cmd, client, Discord) {
        const test_off = new Discord.MessageEmbed()
        .setColor('#FF9333')
        .setTitle('Test completed Successfully.')
        .setDescription('TheEntiretyBot has been updated!!')
        .addFields(
		    { name: 'Author', value: 'Karan Ram' },
	    	{ name: 'Previous version', value: '1.9.7',inline: false },
            { name: 'New Version', value: '1.9.8', inline: false},
    	)
        .setTimestamp()
	    .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
        message.channel.send(test_off);

    }
}

module.exports = {
    name: 'testmode-on',
    aliases: ['start-test'],
    karanOnly: true,
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a test Command",
    execute(message, args, cmd, client, Discord) {
        const test_on = new Discord.MessageEmbed()
        .setColor('#FF9333')
        .setTitle('Test mode activated!')

        .setTimestamp()
	    .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');
        message.channel.send(test_on);

    }
}

const Discord = require("discord.js");
const request = require("node-superfetch");
const { stripIndents } = require("common-tags");
let bearer = process.env.TWITBEARER;

module.exports = {
    name: 'twitter',
    aliases: ['twit'],
    permissions: ['SEND_MESSAGES'],
    cooldown: 0,
    description: "This is a twitter profile info command",
    async execute(message, args, cmd, client, Discord) {
        let username = args[0];
        if (!username) return message.channel.send("Please provide a username.");

        try {
            const { body } = await request.get("https://api.twitter.com/1.1/users/show.json")
                .set({ Authorization: `Bearer ${bearer}` }).query({ screen_name: username });

            const embed = new Discord.MessageEmbed()
                .setColor('#00abff')
                .setAuthor(`@${body.screen_name.toLowerCase()}`, body.verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verified.png" : null, body.url)
                .setDescription(body.description)
                .addField("Counts:", stripIndents`
            - **Follwers:** ${(body.followers_count).toLocaleString()}
            - **Followings:** ${(body.friends_count).toLocaleString()}
            - **Tweets:** ${(body.statuses_count).toLocaleString()}
            - **Favourites:** ${(body.favourites_count).toLocaleString()}
            `, true)
                .addField("Created Since:", body.created_at, true)
                .setThumbnail(body.profile_image_url_https.replace('_normal', ''))
                .setImage(body.profile_banner_url)

            return message.channel.send(embed);

        } catch (error) {
            if (error.status === 403) return message.channel.send("This user is either in private mode, or closed their account");
            else if (error.status === 404) return message.channel.send(":x: User not Found :x:");
            else return message.channel.send(`Unknown error: ${error.message}`);
        }
    }
}

const Discord = require('discord.js');
const { DiscordAPIError } = require('discord.js');
const ban = require('./ban');
module.exports = {
    name: 'unban',
    aliases: [],
    permissions: ["BAN_MEMBERS","ADMINISTRATOR"],
    cooldown: 0,
    description: "This unbans a member",
    async execute(message, args, cmd, client, Discord) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('My role does not have the ban permission!');
        let reason = args.slice(1).join(" ");
        let userID = args[0];


        if (!reason) reason = 'No reason given.';
        if (!args[0]) return message.channel.send('You must specify a member to ban 📛.\nCommand Format: \`!unban ID reason\`');
        if (isNaN(args[0])) return message.channel.send('The member ID stated is not a number ☹️.');

        const unbannedEmbed = new Discord.MessageEmbed()
        .setColor('#ffa700')
        .setDescription(`Successfully Unbaned ${args[0]}\nReason: \`${reason}\``)

        message.guild.fetchBans().then(async bans => {
            if (bans.size == 0) return message.channel.send('😑 The user mentioned is not banned');
            let bUser = bans.find(b => b.user.id == userID);
            if (!bUser) return message.channel.send('😑 The user ID mentioned is not banned.');
            await message.guild.members.unban(bUser.user, reason).catch(err => {
                console.log(err);
                return message.channel.send('❌something went wrong unbanning the ID.❌');
            }).then(() => {
                message.channel.send(unbannedEmbed);
            });
        });

    }
}

module.exports = {
    name: 'unlock',
    aliases: ['khulja'],
    permissions: ["MANAGE_CHANNELS"],
    cooldown: 0,
    description: "This is a channel unlock command!",
    async execute(message, args, cmd, client, Discord) {
        const third = args.join(" ");
        if (third) return;
        const { member, roles } = message

        // const MemberRole = message.guild.roles.cache.get('783319440447504395');
        const MemberRole = member.guild.roles.cache.find(role => role.name === 'Member');

        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(MemberRole, {
            SEND_MESSAGES: true
        }).catch(err => console.log(err));
        message.channel.send('I have unlocked the channel 🔓');
    }

}

const Discord = require("discord.js");

module.exports = {
    name: 'unmute',
    aliases: [],
    permissions: ["MUTE_MEMBERS"],
    cooldown: 0,
    description: "This unmutes the member",
    async execute(message, args, cmd, client, Discord) {
        let reason = args.slice(1).join(" ");
        const { member, roles } = message;
        const muteRole = member.guild.roles.cache.find(r => r.name === 'Mute')
        const memberRole = member.guild.roles.cache.find(r => r.name === 'Member')

        // const muteRole = message.guild.roles.cache.get('831786998918414395');
        // const memberRole = message.guild.roles.cache.get('783319440447504395');
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!reason) reason = 'No reason given.';
        const unmuteEmbed = new Discord.MessageEmbed()
            .setTitle(`🔈 You have been unmuted in ${message.guild.name}`)
            .setDescription(`Reason for being unmuted: ${reason}`)
            .setColor('#5708ab')
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            .setTimestamp();

        const unmutedEmbed = new Discord.MessageEmbed()
        .setColor('#0085ff')
        .setDescription(`🔈 ${mentionedMember} has been unmuted successfully by ${message.author}.\nReason: \`${reason}\``);

        if (!args[0]) return message.channel.send('You must specify a member to unmute 📛.\nCommand Format: \`!unmute @use reason\`');
        if (!mentionedMember) return message.channel.send('☹️ The member stated is not in the server.');
        if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot unmute yourself 🙅.');
        if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot unmute me with my own command ☹️');
        if (message.member.roles.highest.position < mentionedMember.roles.highest.position) return message.channel.send('You cannot unmute that member because the person eko has muted them have higher permissions than you 😕.');
        if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This member is already unmuted 🙂.');

        await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
        await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err))//.then(message.channel.send('There was an issue muting the member.'));
        await mentionedMember.roles.remove(muteRole.id).then(message.channel.send(unmutedEmbed)).catch(err => console.log(err).then(message.channel.send('There was an issue in removing member from role.')));

    }
}

const moment = require("moment");
module.exports = {
    name: 'user-info',
    permissions: ['SEND_MESSAGES'],
    cooldown: 0,
    description: "This gives info about users",
    execute(message, args, cmd, client, Discord) {

        const third = args.slice(1).join(" ");
        if (third) return;
        let user = message.mentions.users.first() || message.author;
        if (user.presence.status === "dnd") user.presence.status = "Do Not Disturb";
        if (user.presence.status === "idle") user.presence.status = "Idle";
        if (user.presence.status === "offline") user.presence.status = "Offline";
        if (user.presence.status === "online") user.presence.status = "Online";

        function game() {
            let game;
            if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
            else if (user.presence.activities.length < 1) game = "None";
            return game;
        }

        let x = Date.now() - user.createdAt;
        let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
        let created = Math.floor(x / 86400000);
        let joined = Math.floor(y / 86400000);

        const member = message.guild.member(user);
        let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None";
        let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        let status = user.presence.status;
        let avatar = user.displayAvatarURL({ size: 2048, dynamic: true });

        const newEmbed = new Discord.MessageEmbed()
            .setColor('#D27D7D')
            .setAuthor(user.tag, avatar)
            .setThumbnail(avatar)
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Nickname', value: nickname, inline: true },
                { name: 'Created Account Date', value: `${createdate} \nsince ${created} day(s) ago`, inline: true },
                { name: 'Server Joined Date', value: `${joindate} \nsince ${joined} day(s) ago`, inline: true },
                { name: 'Status', value: status, inline: true },
                { name: 'Game', value: game(), inline: true }
            )
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');


        message.channel.send(newEmbed);

    }
}


const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    desription: "This is a weather command",
    async execute(message, args, cmd, client, Discord) {
        let city = args.join(" ");
        let degreetype = "C";

        await weather.find({search: city, degreeType: degreetype}, function(err, result) {
            if(!city) return message.channel.send("Please insert the city name to get its weather info.");
            if(err || result === undefined || result.length === 0) return message.channel.send('Unknown city. Please try again.');

            let current = result[0].current;
            let location = result[0].location;

            const embed = new Discord.MessageEmbed()
            .setColor('#4598CC')
            .setAuthor(current.observationpoint)
            .setDescription(`> ${current.skytext}`)
            .setThumbnail(current.imageUrl)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            embed.addField("Latitude", location.lat, true)
            .addField("Longitude", location.long, true)
            .addField("Feels Like", `${current.feelslike}° Degrees`, true)
            .addField("Degree Type", location.degreetype, true)
            .addField("Winds", current.winddisplay, true)
            .addField("Humidity", `${current.humidity}%`, true)
            .addField("Sky Text", current.skytext, true)
            .addField("Timezone", `GMT ${location.timezone}`, true)
            .addField("Day", current.day, true)
            .addField("Temperature", `${current.temperature}° Degrees`)
            .addField("Observation Time", current.observationtime, true )
            .addField("Observation Point", current.observationpoint, true)

            return message.channel.send(embed);

        })
    }
}

const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
    name: 'wikipedia',
    aliases: ['wiki'],
    permissions: ["MANAGE_MESSAGES"],
    cooldown: 0,
    description: "This is a web search command",
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.channel.send('Please enter a query to get info about it!');
        const name = args.join(" ");

        const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${name}`)
            .then(res => res.json().catch(() => { }));
        if (!body)
            return message.channel.send("Page not found :x:");
        if (body.title && body.title === "Not found.")
            return message.channel.send("Error! Page Not Found... :x:");

        const embed = new Discord.MessageEmbed()
            .setColor('#660019')
            .setAuthor(`${body.title}`, 'https://upload.wikimedia.org/wikipedia/commons/d/de/Wikipedia_Logo_1.0.png', body.content_urls.desktop.page)
            .addField("More Info", `**[Click Here to get more info on ${body.title}](${body.content_urls.desktop.page})**`, true)
            .setDescription(`${body.extract}`)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        if (body.thumbnail) embed
            .setThumbnail(body.thumbnail.source);
        message.channel.send(embed);
    }
}

const levels = require('discord-xp');
module.exports = {
    name: 'xpedit',
    devOnly: false,
    karanOnly: true,
    aliases: ['exp'],
    permissions: [],
    cooldown: 0,
    description: "This command edits the xp",
    async execute(message, args, cmd, client, Discord) {
        const third = args.slice(4).join(" ");
        if (third) return;

        let usage = '!edit @member [xp, level] [add, set, remove] <number>';
        const mentionedMember = message.mentions.members.first() || message.guild.channels.cache.get(args[0]);

        if (!args[0]) return message.channel.send(`You need to state more arguments\n\`${usage}\``);
        if (!mentionedMember) return message.channel.send('The specified member is not in the server.');
        if (!args[1]) return message.channel.send(`You must state if you editing the members level or xp:\n\`${usage}\``);
        if (!['xp', 'level'].includes(args[1])) return message.channel.send(`Your second argument was not level or xp:\n\`${usage}\``);
        if (args[1] == 'xp') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send(`You have to state if you are adding, setting or removing xp from the member.\n\`${usage}\``);
            const value = Number(args[3]);
            const levelUser = await levels.fetch(mentionedMember.id, message.guild.id);
            if (!levelUser) return message.channel.send('That member is not registered in the database yet.');
            if (args[2] == 'add') {
                if (!value) return message.channel.send('You need to mention a xp amount to add');
                try {
                    await levels.appendXp(mentionedMember.id, message.guild.id, value);
                    message.channel.send(`Added : ${value} xp to ${mentionedMember.user.tag}`)
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send('You need to mention a xp amount to remove');
                try {
                    await levels.subtractXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Removed: ${value} xp from ${mentionedMember.user.tag}`)
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send('You need to mention a xp amount to set');
                try {
                    await levels.setXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`${mentionedMember.user.tag}'s xp set to ${value}`)
                } catch (err) {
                    console.log(err);
                }
            }

        } else if (args[1] == 'level') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send(`You have to state if you are adding, setting or removing level(s) from the member.\n\`${usage}\``);
            const value = Number(args[3]);
            const levelUser = await levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send('That member is not registered in the database yet.');
            if (args[2] == 'add') {
                if (!value) return message.channel.send('You need to mention a amount of level to add');
                try {
                    await levels.appendLevel(mentionedMember.id, message.guild.id, value);
                    message.channel.send(`Added : ${value} level(s) to ${mentionedMember.user.tag}`)
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send('You need to mention a amount of level to remove');
                try {
                    await levels.subtractLevel(mentionedMember.id, message.guild.id, value);
                    message.channel.send(`Removed: ${value} level(s) from ${mentionedMember.user.tag}`)
                } catch (err) {
                    console.log(err);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send('You need to mention a amount of level to set');
                try {
                    await levels.setLevel(mentionedMember.id, message.guild.id, value);
                    message.channel.send(`${mentionedMember.user.tag}'s level set to ${value}`)
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
}

const fetch = require('node-superfetch');
const Discord = require('discord.js');


module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a youtube command",
    async execute(message, args, cmd, client, Discord) {
        let name = args.join(" ");
        if (!name) return message.channel.send("Unknown channel name.");

        const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${process.env.YOUTUBEAPI}&maxResults=1&type=channel`).catch(() => message.channel.send('Unknown channel error.'));
        if (!channel.body.items[0]) return message.channel.send("No channel were found!");

        const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${process.env.YOUTUBEAPI}`).catch(() => message.channel.send("Unknown channel data error!"));

        const embed = new Discord.MessageEmbed()
            .setColor('#CE9160')
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setAuthor(channel.body.items[0].snippet.channelTitle, channel.body.items[0].snippet.thumbnails.high.url, `https://www.youtube.com/channel/${channel.body.items[0].id.channelId}`)
            .addField("Channel Name", channel.body.items[0].snippet.channelTitle, true)
            .addField("Channel Description", channel.body.items[0].snippet.description, true)
            .addField("Subscribers", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
            .addField("Total views", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
            .addField("Total Video(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
            .addField("Date Created", new Date(channel.body.items[0].snippet.publishedAt).toLocaleString(), true)
            .addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
            
        return message.channel.send(embed).catch(err => console.log(err).then(console.log('error in finding the video')));
    }
}

const Discord = require('discord.js');
const ytsr = require('ytsr');
module.exports = {
    name: 'ytsearch',
    aliases: ['ytv'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a youtube command",
    async execute(message, args, cmd, client, Discord) {
        const query = args.join(" ");
        if (!query) return message.channel.send('Please provide a name of a video to search!');
        const res = await ytsr(query).catch(e => {
            return message.channel.send('No result were found!');
        });
        const video = res.items.filter(i => i.type === "video")[0];
        if (!video) return message.channel.send('Please provide a name of a video to search!');

        const youtubeEmbed = new Discord.MessageEmbed()
        .setTitle(video.title)
        .setColor('#CE2029')
        .setThumbnail(video.author.bestAvatar.url)
        .setImage(video.bestThumbnail.url)
        .setDescription(`> [Click here to watch!](${video.url})`)
        .setAuthor(video.author.name, video.author.bestAvatar.url, video.author.url)
        .addField("Views", video.views.toLocaleString(), true)
        .addField("Duration", video.duration, true)
        .addField("Uploaded At", video.uploadedAt, true)
        .setTimestamp()
        .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')
        
        return message.channel.send(youtubeEmbed)

        
    }
}