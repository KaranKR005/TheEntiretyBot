// const Commando = require("discord.js-commando");
// const axios = require("axios");
// module.exports = {
//     name: 'corona',
//     aliases: ['co'],
//     permissions: ['SEND_MESSAGES'],
//     cooldown: 0,
//     description: "This is a corona graph command",
//     async execute(message, args, cmd, client, Discord) {
//         const days = parseInt(args) || 30

//         const url = 'https://corona.lmao.ninja/v2'
//         let { data: results } = await axios.get(url)
//         results = results.slice(0, days)

//         // const labels = []
//         // const deaths = []
//         // const cases = []
//         // const recovered = []

//         // for (const result of results) {
//         //     let date = String(result.date)
//         //     const year = date.substring(0, 4)
//         //     const month = date.substring(4, 6)
//         //     const day = date.substring(6, 8)
//         //     labels.push(`${day}/${month}/${year}`)

//         //     deaths.push(result.death)
//         //     cases.push(result.positive)
//         //     recovered.push(result.recovered)
//         //     InICU.push(result.inIcuCurrently)
//         //     onVentilator.push(result. onVentilatorCurrently)
//         //     hospitalzed.push(result.hospitalized)
//         // }
//         console.log(results)

//     // const embed = new Discord.MessageEmbed()
//     // .setColor('#fb644c')
//     // .setTitle(args[0] ? `${args[0].toUpper}`)
//     }
// }