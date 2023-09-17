const Discord = require("discord.js");
const Canvas = require("discord-canvas");
const MessageAttachment = require("discord.js");

module.exports = (client) => {
    let welcomeChannel = '840600796088631316'

    client.on('guildMemberAdd', async (member) => {
        if (member.guild.id === '783217517455605810' || '864021290578346035') {

            const user = member.user;

            const image = await new Canvas.Welcome()
                .setUsername(user.username)
                .setDiscriminator(user.discriminator)
                .setMemberCount(member.guild.memberCount)
                .setGuildName(member.guild.name)
                .setAvatar(user.displayAvatarURL({ format: "png", dynamic: true }))
                .setColor("border", "#FB7746")
                .setColor("username-box", "#EEB677")
                .setColor("discriminator-box", "#888582")
                .setColor("message-box", "#74EB5B")
                .setColor("title", "#F19D45")
                .setColor("avatar", "#FFFFFF")
                .setBackground("https://wallpapercave.com/wp/wp7044480.jpg")
                .toAttachment();

            const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
            const channel = member.guild.channels.cache.get(welcomeChannel)


            channel.send(attachment);
            user.send(attachment);

        } else {
            return;
        }

    })
}