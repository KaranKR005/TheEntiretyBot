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