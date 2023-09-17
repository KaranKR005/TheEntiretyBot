const Discord = require("discord.js");
const request = require("node-superfetch");
const { stripIndents } = require("common-tags");
let bearer = process.env.TWITBEARER;

module.exports = {
    name: 'twitter',
    aliases: ['twit'],
    permissions: ['SEND_MESSAGES'],
    cooldown: 0,
    description: "This is a twitter profile info command",
    async execute(message, args, cmd, client, Discord) {
        let username = args[0];
        if (!username) return message.channel.send("Please provide a username.");

        try {
            const { body } = await request.get("https://api.twitter.com/1.1/users/show.json")
                .set({ Authorization: `Bearer ${bearer}` }).query({ screen_name: username });

            const embed = new Discord.MessageEmbed()
                .setColor('#00abff')
                .setAuthor(`@${body.screen_name.toLowerCase()}`, body.verified ? "https://emoji.gg/assets/emoji/6817_Discord_Verified.png" : null, body.url)
                .setDescription(body.description)
                .addField("Counts:", stripIndents`
            - **Follwers:** ${(body.followers_count).toLocaleString()}
            - **Followings:** ${(body.friends_count).toLocaleString()}
            - **Tweets:** ${(body.statuses_count).toLocaleString()}
            - **Favourites:** ${(body.favourites_count).toLocaleString()}
            `, true)
                .addField("Created Since:", body.created_at, true)
                .setThumbnail(body.profile_image_url_https.replace('_normal', ''))
                .setImage(body.profile_banner_url)

            return message.channel.send(embed);

        } catch (error) {
            if (error.status === 403) return message.channel.send("This user is either in private mode, or closed their account");
            else if (error.status === 404) return message.channel.send(":x: User not Found :x:");
            else return message.channel.send(`Unknown error: ${error.message}`);
        }
    }
}