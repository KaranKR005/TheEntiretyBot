module.exports = {
    name: 'slowmode',
    aliases: ['slow', 'slowmo'],
    permissions: ["MANAGE_CHANNELS"],
    cooldown: 0,
    description: 'This command enables slowmode',
    async execute(message, args, cmd, client) {

        const third = args.slice(1).join(" ");
        if (third) return;
        if (!args[0]) return message.channel.send('You did not mentioned a number in seconds to use slowmode.\nCommand format: \`!slowmode timeinseconds\`');
        if (args[0] === 'none') {
            await message.channel.setRateLimitPerUser(0);
            return message.channel.send('Set Slowdown to 0 seconds!');
        };
        if (isNaN(args[0])) return message.channel.send('Number stated is not a number.');
        const setTimeTo = Number(args[0]);

        if (setTimeTo === 5) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 10) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 15) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 30) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 60) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 120) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 300) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 600) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 900) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 1800) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };
        
        if (setTimeTo === 3600) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 7200) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        if (setTimeTo === 21600) {
            await message.channel.setRateLimitPerUser(setTimeTo);
            return message.channel.send(`Set Slowdown to ${setTimeTo} seconds!`);
        };

        message.channel.send('Invalid Time in seconds, Options:\n\`none, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200 and 21600\` seconds.')

    }
}
