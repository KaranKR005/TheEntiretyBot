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