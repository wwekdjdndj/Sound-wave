const config = require("../../botconfig/config.json");
const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  cooldown: 5,
  userPermissions: [],
  botPermissions: [],

  run: async (client, interaction, args, ee) => {
    try {
      interaction.reply({embeds:[new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`š¤ **Bot Ping:** \`${Date.now() - interaction.createdTimestamp}ms\`\n\nā **Api Latency:** \`${Math.round(client.ws.ping)}ms\``, true)]}
        )
    } catch (error) {
      console.error(error)
    }
  }
}
