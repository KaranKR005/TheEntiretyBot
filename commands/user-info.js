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
