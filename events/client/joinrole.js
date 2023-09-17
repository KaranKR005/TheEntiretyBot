const Discord = require("discord.js");
module.exports = (client) => {


    client.on('guildMemberAdd', async (member) => {
        if (member.guild.id === '783217517455605810') {

            let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Member')
            member.roles.add(welcomeRole)
        } else {
            return;
        }

    })
}