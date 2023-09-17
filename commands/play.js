// const ytdl = require('ytdl-core');
// const ytSearch = require('yt-search');

// const queue = new Map();

// module.exports = {
//     name: 'play',
//     aliases: ['stop', 'skip'],
//     permissions: ["SEND_MESSAGES"],
//     cooldown: 0,
//     description: "Advanced music bot",
//     async execute(message, args, cmd, client, Discord) {


//         const voice_channel = message.member.voice.channel;
//         if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
//         const permissions = voice_channel.permissionsFor(message.client.user);
//         if (!permissions.has('CONNECT')) return message.channel.send('You don\'t have permission to use this command');
//         if (!permissions.has('SPEAK')) return message.channel.send('You don\'t have permission to use this command');

//         const server_queue = queue.get(message.guild.id);

//         // const pause = (message, server_queue) => {
//         //     if (server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused!");//Checks if the song is already paused.
//         //     server_queue.connection.dispatcher.pause();//If the song isn't paused this will pause it.
//         //     message.channel.send("Paused the song!");//Sends a message to the channel the command was used in after it pauses.
//         // }

//         // const resume = (message, server_queue) => {
//         //     if (!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");//Checks if the song isn't paused.
//         //     server_queue.connection.dispatcher.resume();//If the song is paused this will unpause it.
//         //     message.channel.send("Unpaused the song!");//Sends a message to the channel the command was used in after it unpauses.
//         // }

//         const skip_song = (message, server_queue) => {
//             message.channel.send('Skipped!  ⏭️');
//             if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
//             if (!server_queue) {
//                 return message.channel.send('There arge no songs in queue :pensive:');
//             }
//             server_queue.connection.dispatcher.end();
//         }

//         const stop_song = (message, server_queue) => {
//             if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
//             server_queue.songs = [];
//             server_queue.connection.dispatcher.end();
//         }



//         const video_player = async (guild, song) => {
//             const song_queue = queue.get(guild.id);

//             if (!song) {
//                 song_queue.voice_channel.leave();
//                 queue.delete(guild.id);
//                 return;
//             }
//             const stream = ytdl(song.url, { filter: 'audioonly' });
//             song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
//                 .on('finish', () => {
//                     song_queue.songs.shift();
//                     video_player(guild, song_queue.songs[0]);
//                 });

//             const playEmbed = new Discord.MessageEmbed()
//                 .setColor('ff922d')
//                 .setTitle('🎶 Now Playing 🎶')
//                 .setDescription(song.title)
//                 .setTimestamp()
//                 .setFooter('TheEntiretyBot', 'https://scitechdaily.com/images/Spiral-Galaxy-NGC-5643.jpg');

//             await song_queue.text_channel.send(playEmbed)
//         }



//         if (cmd === 'play') {
//             if (!args.length) return message.channel.send('you need to send the second argument!');
//             let song = {};


//             if (ytdl.validateURL(args[0])) {
//                 const song_info = await ytdl.getInfo(args[0]);
//                 song = { title: song_info.videoDetails.title, URL: song_info.videoDetails.video_url }
//             } else {
//                 const video_finder = async (query) => {
//                     const videoResult = await ytSearch(query);
//                     return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
//                 }

//                 const video = await video_finder(args.join(''));
//                 if (video) {
//                     song = { title: video.title, url: video.url }
//                 } else {
//                     message.channel.send('Error in finding the video');
//                 }
//             }

//             if (!server_queue) {

//                 const queue_constructor = {
//                     voice_channel: voice_channel,
//                     text_channel: message.channel,
//                     connection: null,
//                     songs: []
//                 }

//                 queue.set(message.guild.id, queue_constructor);
//                 queue_constructor.songs.push(song);

//                 try {
//                     const connection = await voice_channel.join();
//                     queue_constructor.connection = connection;
//                     video_player(message.guild, queue_constructor.songs[0]);
//                 } catch (err) {
//                     queue.delete(message.guild.id);
//                     message.channel.send('There was an error in connecting! : (');
//                     throw err;
//                 }
//             } else {
//                 server_queue.songs.push(song);
//                 const queueembed = new Discord.MessageEmbed()
//                     .setColor('ff922d')
//                     .setTitle('Added to queue!')
//                     .setDescription(`${song.title}`)
//                     .setFooter(`Added by ` + message.author.tag)
//                     .setTimestamp()
//                 return message.channel.send(queueembed);
//             }
//         }

//         else if (cmd === 'skip') skip_song(message, server_queue);
//         else if (cmd === 'stop') stop_song(message, server_queue);
//         // else if (cmd === 'pause') stop_song(message, server_queue);
//         // else if (cmd === 'resume') stop_song(message, server_queue);


//     }
// }