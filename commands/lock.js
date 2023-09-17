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