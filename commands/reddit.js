const Discord = require("discord.js");
const request = require("node-superfetch");
module.exports = {
    name: 'reddit',
    aliases: [],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This is a reddit command",
    async execute(message, ags, cmd, client, Discord) {
        // try {
        //     let user = args[0];
        //     if (!user) return message.channel.send('Please input the reddit username to get info about them');

        //     const { body } = await fetch(`https://www.reddit.com/${user}/about.json`);
        //     const { data } = body;

        //     if (data.hide_from_robots) return message.channel.send("This user is hidden :lock:");

        //     const embed = new Discord.MessageEmbed()
        //         .setColor('#008972')
        //         .setThumbnail(data.icon_img.replace(/(amp;)/gi, ""))
        //         .setURL(`https://www.reddit.com/user/${user}`)
        //         .setTitle(`${data.name}`)
        //         .addField("username", data.name, true)
        //         .addField("ID", data.id, true)
        //         .addField("Karma", Number(data.total_karma), true)
        //         .addField("Date Created", require("moment").utc(data.created_utc * 1000).format("MM/DD/YYYY h:mm A"), true)
        //         .addField("Gold/Premium?", data.is_gold ? "Yes." : "No.", true)
        //         .addField("Verified", Data.verified ? "Yes." : "No.", true)
        //     return message.channel.send(embed);
        // } catch (error) {
        //     if (error.status === 403) return message.channel.send("This user is either in private mode, or closed their account");
        //     else if (error.status === 404) return message.channel.send("User not found...!");
        //     else return message.channel.send(`An error occured: **${error.message}**`);
        // }

        message.channel.send('❗ There are some reddit server error in this command.\nThis will be fixed soon : )');
    }
}