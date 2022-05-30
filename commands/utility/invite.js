const config = require('../../botconfig/config.json');
const eec = require('../../botconfig/embed.json');
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'invite',
  aliases: ['invite-me'],
  usage: '',
  description: 'Give You My Invite Link',
  category: "utility",
  cooldown: 0,
  userPermissions: [],
  botPermissions: [],

  run: async (client, message, args, ee) => {
    try {

    let embed = new MessageEmbed()
      .setTitle(`${client.allEmojis.y} Invite ${client.user.tag}`)
      .setDescription(`||[*Click here for an Invite link without Slash Commands*](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=536870911999&scope=bot)||`)
      .setColor(ee.color)
      .setImage(eec.gif)
      .setFooter(ee.footertext, ee.footericon)

    let supportbutton = new MessageButton()
            .setStyle("LINK")
            .setLabel("Join Support!")
            // .setEmoji('❤️')
            .setURL(process.env.SUPPORT)  

    let invitebutton = new MessageButton()
            .setStyle("LINK")
            .setLabel("Invite Me!")
            // .setEmoji('✅')
            .setURL(process.env.INVITE)

    let websitebutton = new MessageButton()
            .setStyle("LINK")
            .setLabel("Check Website!")
            // .setEmoji('🌐')
            .setURL(process.env.WEBSITE)

    const row = new MessageActionRow()
        .addComponents(supportbutton, invitebutton, websitebutton);

    return message.reply({
        embeds: [embed],
        components: [row]
    }).catch(err => console.log(err));
    
    } catch (e) {
      console.log(String(e.stack).bgRed)
      const errorLogsChannel = client.channels.cache.get(config.botlogs.errorLogsChannel);
      return errorLogsChannel.send({
        embeds: [new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.guild.name, message.guild.iconURL({
            dynamic: true
          }))
          .setTitle(`${client.allEmojis.x} Got a Error:`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
          .setFooter(`Having: ${message.guild.memberCount} Users`)
        ]
      })
    }
  }
}
