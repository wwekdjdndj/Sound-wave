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
  usage: "help [cmdname]",
  aliases: ["h", "halp", "helpme"],
  description: "Returns all Commmands, or one specific command",
  cooldown: 10,
  userPermissions: [],
  botPermissions: [],

  run: async (client, message, args, ee, prefix) => {
    try {

      if (args[0]) {
        const embed = new MessageEmbed()
          .setColor(ee.color)

        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!cmd) {
          return message.reply({
            embeds: [embed
              .setColor(ee.wrongcolor)
              .setDescription(`${client.allEmojis.x} No Information found for the command **${args[0].toLowerCase()}**`)
            ]
          });
        }
        if (cmd.name) embed.setTitle(`${client.allEmojis.y} Information About the Commands`);
        if (cmd.name) embed.addField("**🎧 Command name**", `\`\`\`${cmd.name}\`\`\``);
        if (cmd.description) embed.addField("**🎧 Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**🎧 Aliases**", `\`\`\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\`\`\``);
        } catch { }
        if (cmd.cooldown) embed.addField("**🎧 Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**🎧 Usage**", `\`\`\`${prefix}${cmd.usage}\`\`\``);
        }
        return message.reply({
          embeds: [embed]
        });
      } else {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        message.reply({
          embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setImage(ee.helpgif)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`🔰 __**HELP MENU**__ 🔰`)
            .addField(`🔰 | __**INFORMATION**__`, `>>> \`help\`︲\`ping\``)
            .addField(`💪 __**| SETUP**__`, `>>> \`music-menu\`︲\`remove-music-menu\``)
            .addField(`🎶 __**| MUSIC**__`, `>>> \`play\`︲\`skip\`︲\`stop\`︲\`volume\`︲\`loop\`︲\`addrelatedsong\`︲
            \`autoplay\`︲\`queue\`︲\`pause\`︲\`resume\`︲\`shuffle\``)
            .addField(`📈 __**STATS**__`, `>>> ⚙️ **${client.commands.size} Commands**
    📁 on **${client.guilds.cache.size} Guilds**
    ⌚️ \`${days} Days\`, \`${hours} Hrs\`, \`${minutes} Mins\`, \`${seconds} Secs\` **Uptime**
    📶 \`${client.ws.ping}ms\` **Ping**
    <:MilanioDevelopment:915263974256279612> Made By **[Milanio Development](https://dsc.gg/milanio.dev)**`)]
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
}
