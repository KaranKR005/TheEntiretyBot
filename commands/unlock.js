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