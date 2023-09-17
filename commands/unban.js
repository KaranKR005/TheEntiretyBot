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