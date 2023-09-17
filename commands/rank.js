// const Levels = require('discord-xp');
// const canvas = require('canvas');
// const data = require('canvacord/src/Plugins');
// const { createCanvas, loadImage } = require('canvas');
// const { UserFlags } = require('discord.js');
// // const { discordTime } = require('canvacord/typings/src/Util');



const Levels = require('discord-xp');
const canvas = require('canvas');
const data = require('canvacord/src/Plugins');
const { createCanvas, loadImage } = require('canvas');
const { UserFlags } = require('discord.js');
// const { discordTime } = require('canvacord/typings/src/Util');

// Import your database library (e.g., Mongoose)
const mongoose = require('mongoose');

// Define your 'users' model or schema
const User = mongoose.model('User', {
    guild: String, // Define your schema based on your database structure
    user: String,
    // Add other necessary fields here
});

module.exports = {
    name: 'rank',
    aliases: ['lvl'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: "This gives the level info",
    async execute(message, args, cmd, client, Discord) {

        const user = message.mentions.users.first() || message.author;

        // Now you can use the 'User' model to fetch data from your database
        let datas = await User.find({ guild: message.guild.id }) || []; // Make sure to replace 'User' with your actual model name and use an empty array as a default value
        let data, rank;

        // Check if datas is an array before using forEach
        if (Array.isArray(datas)) {
            datas.forEach((v, i) => {
                if (v.user === user.id) {
                    data = v;
                    rank = i + 1;
                }
            });
        } else {
            console.error("datas is not an array:", datas);
            return message.channel.send('There was an error fetching user data.');
        }

        // Check if data is defined before accessing its properties
        if (data && data.level !== undefined) {
            let reqXP = 100;
            for (let i = 1; i <= data.level; i++) {
                reqXP += 5 * (i ^ 2) + (50 * i) + 100;
            }
            // The rest of your code for creating the rank image goes here...
        }
        const canvas = createCanvas(1000, 300);
        const ctx = canvas.getContext('2d');
        const bar_width = 600;
        const bg = await loadImage("https://i.postimg.cc/Bv5XTvRn/Karan-Ram.webp");
        const av = await loadImage(user.displayAvatarURL({ format: 'png', dynamic: 'false' }));
        
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(120, 120, 110, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.lineJoin = "round";
        ctx.lineWidth = 69;
        ctx.strokeRect(298, 199, bar_width, 2);

        ctx.strokeStyle = "black";
        ctx.strokeRect(300, 200, bar_width, 0);

        ctx.strokeStyle = "#1762e8";
        ctx.strokeRect(300, 200, bar_width * data.xp / reqXP, 0);

        ctx.beginPath();
        ctx.arc(120, 120, 110, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(av, 10, 10, 220, 200);

        const { member } = message;
        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) mentionedMember = message.member;

        const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
        const neededXp = Levels.xpFor(parseInt(target.level) + 1);

        if (!target) return message.channel.send('The member stated does not have any levels within the server.');

        const rankObj = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setCurrentXP(target.xp, '#CFEE30')
            .setLevel(target.level)
            .setRank(1, 'RANK', false)
            .setRequiredXP(neededXp, '#280B2C')
            .setStatus(user.presence.status)
            .setProgressBar('#7AF900', "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator, 'FFFFFF')
            .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/845217298893242389/845515928015208448/The_Entirety_Server_1.jpg");

        rankObj.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, 'rank.png');
                message.channel.send(attachment);
            });
    }
}











// const Levels = require('discord-xp');
// const canvas = require('canvas');
// const data = require('canvacord/src/Plugins');
// const { createCanvas, loadImage } = require('canvas');
// const { UserFlags } = require('discord.js');
// // const { discordTime } = require('canvacord/typings/src/Util');
// module.exports = {
//     name: 'rank',
//     aliases: ['lvl'],
//     permissions: ["SEND_MESSAGES"],
//     cooldown: 0,
//     description: " This gives the level info",
//     async execute(message, args, cmd, client, Discord) {

//         const user = interaction.options.getUser("user") || interaction.user;
//         let datas = await users.find({ guild: interaction.guild.id }) || {}, data, rank;

//         datas.forEach((v, i) => {
//             if (v.user === user.id) {
//                 data = v;
//                 rank = i + 1;
//             }
//         });

//         let reqXP = 100;
//         for (let i = 1; i <= data.level; i++)reqXP += 5 * (i ^ 2) + (50 * i) + 100;

//         const canvas = createCanvas(1000, 300);
//         const ctx = canvas.getContext('2d'),
//             bar_width = 600,
//             bg = await loadImage("https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg")
//         av = await loadImage(interaction.user.displayAvatarURL({ format: 'png', dynamic: 'false' }))
//         ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

//         ctx.beginPath();
//         ctx.arc(120, 120, 110, 0, 2 * Math.PI);
//         ctx.lineWidth = 2;
//         ctx.strokeStyle = "white";
//         ctx.fill();
//         ctx.stroke();
//         ctx.closePath();

//         ctx.lineJoin = "round";
//         ctx.lineWidth = 69;
//         ctx.strokeRect(298, 199, bar_width, 2);


//         ctx.strokeStyle = "black";
//         ctx.strokeRect(300, 200, bar_width, 0);


//         ctx.strokeStyle = "#1762e8"
//         ctx.strokeRect(300, 200, bar_width * data.xp / reqXP, 0);

//         ctx.beginPath();
//         ctx.arc(120, 120, 110, 0, 2 * Math.PI);
//         ctx.closePath();
//         ctx.clip();

//         ctx.drawImage(av, 10, 10, 220, 200)




//         const { member } = message
//         let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
//         if (!mentionedMember) mentionedMember = message.member;

//         const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
//         const neededXp = Levels.xpFor(parseInt(target.level) + 1)

//         if (!target) return message.channel.send('The member stated Does not have any levels within the server.');

//         const rank = new canvacord.Rank()
//         .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
//         .setCurrentXP(target.xp, '#CFEE30')
//         .setLevel(target.level)
//         .setRank(1, 'RANK', false)
//         .setRequiredXP(neededXp, '#280B2C')
//         .setStatus(user.presence.status)
//         .setProgressBar('#7AF900', "COLOR")
//         .setUsername(user.username)
//         .setDiscriminator(user.discriminator, 'FFFFFF')
//         .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/845217298893242389/845515928015208448/The_Entirety_Server_1.jpg")
    
//         rank.build()
//             .then(data => {
//                 const attachment = new Discord.MessageAttachment(data, 'rank.png')
//                 message.channel.send(attachment);
//             })
//     }
// }