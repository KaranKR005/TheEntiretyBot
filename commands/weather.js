const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    desription: "This is a weather command",
    async execute(message, args, cmd, client, Discord) {
        let city = args.join(" ");
        let degreetype = "C";

        await weather.find({search: city, degreeType: degreetype}, function(err, result) {
            if(!city) return message.channel.send("Please insert the city name to get its weather info.");
            if(err || result === undefined || result.length === 0) return message.channel.send('Unknown city. Please try again.');

            let current = result[0].current;
            let location = result[0].location;

            const embed = new Discord.MessageEmbed()
            .setColor('#4598CC')
            .setAuthor(current.observationpoint)
            .setDescription(`> ${current.skytext}`)
            .setThumbnail(current.imageUrl)
            .setTimestamp()
            .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg')

            embed.addField("Latitude", location.lat, true)
            .addField("Longitude", location.long, true)
            .addField("Feels Like", `${current.feelslike}° Degrees`, true)
            .addField("Degree Type", location.degreetype, true)
            .addField("Winds", current.winddisplay, true)
            .addField("Humidity", `${current.humidity}%`, true)
            .addField("Sky Text", current.skytext, true)
            .addField("Timezone", `GMT ${location.timezone}`, true)
            .addField("Day", current.day, true)
            .addField("Temperature", `${current.temperature}° Degrees`)
            .addField("Observation Time", current.observationtime, true )
            .addField("Observation Point", current.observationpoint, true)

            return message.channel.send(embed);

        })
    }
}