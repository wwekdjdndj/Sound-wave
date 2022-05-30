const config = require('../../botconfig/config.json');
const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "ping",
  aliases: ["latency"],
  usage: '',
  description: "Gives you information on how fast the Bot can respond to you",
  cooldown: 10 * 1000,
  userPermissions: [],
  botPermissions: [],

  run: async (client, message, args, ee) => {
    try {
      message.reply({
				embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`🔍 Pinging...`)]}).then(msg => {
        const ping = msg.createdTimestamp - message.createdTimestamp;
        msg.edit({
				embeds: [new MessageEmbed()
          .setAuthor("🏓 Pong!")
          .setColor(ee.color)
          .addField('API Ping', client.ws.ping + "ms")
          .addField('Message Ping', (Date.now() - message.createdTimestamp) + "ms")
        ]});
      }).catch(e => message.channel.send(e));
    } catch (e) {
      console.log(e)
    }
  },
};