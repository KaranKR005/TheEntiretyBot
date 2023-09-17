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

        let usage = '!xpedit @member [xp, level] [add, set, remove] <number>';
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