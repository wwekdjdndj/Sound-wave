const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton
} = require('discord.js');
const Schema = require('../../models/MusicMenuSchema');

module.exports = {
    name: "remove-music-menu",
    aliases: [],
    description: "",
    cooldown: 0,
    userPermissions: ["ADMINISTARTOR"],
    botPermissions: [],

    run: async (client, message, args, ee) => {
        try {

            Schema.findOneAndDelete({
                Guild: message.guild.id
            }, async (err, data) => {
                if (!data) return message.reply({
                    embeds: [new MessageEmbed()
                        .setTitle(`${client.allEmojis.x} Music Menu System`)
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`No __Music Menu Channel__ Found`)
                    ]
                })

                message.reply({
                    embeds: [new MessageEmbed()
                        .setTitle(`${client.allEmojis.y} Music Menu System`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`**Music Menu Channel** has been Removed!`)
                    ]
                });
            })
        } catch (e) {
            console.log(e)
        }
    }
};

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */