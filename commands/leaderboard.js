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