const config = require('../../botconfig/config.json');
const Discord = require('discord.js')
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require('discord.js');

module.exports = {
  name: "help",
  description: "Returns all Commmands, or one specific command",
  cooldown: 10,
  userPermissions: [],
  botPermissions: [],

  run: async (client, interaction, args, ee, prefix) => {
    try {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setImage(ee.helpgif)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`🔰 __**HELP MENU**__ 🔰`)
            .addField(`🔰 | __**INFORMATION**__`, `>>> \`help\`︲\`ping\``)
            .addField(`🎶 __**| MUSIC**__`, `>>> \`play\`︲\`skip\`︲\`stop\`︲\`volume\`︲\`loop\`︲\`addrelatedsong\`︲
            \`autoplay\`︲\`queue\`︲\`pause\`︲\`resume\`︲\`previous\`︲\`shuffle\`︲\`filters\``)
            .addField(`📈 __**STATS**__`, `>>> ⚙️ **${client.commands.size} Commands**
    📁 on **${client.guilds.cache.size} Guilds**
    ⌚️ \`${days} Days\`, \`${hours} Hrs\`, \`${minutes} Mins\`, \`${seconds} Secs\` **Uptime**
    📶 \`${client.ws.ping}ms\` **Ping**
    <:MilanioDevelopment:915263974256279612> Made By **[Milanio Development](https://dsc.gg/milanio.dev)**`)]
        })
    } catch (err) {
      console.log(err)
    }
  }
}
