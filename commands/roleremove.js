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