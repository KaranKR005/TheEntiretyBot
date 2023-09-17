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
        return message.channel.send(`Sorry this permission is disabled.\nOnly Karan Ram can use \`${prefix}${command.name}\` command!`)
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