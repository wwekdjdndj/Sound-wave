const config = require('../../botconfig/config.json');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'volume',
    aliases: ["vol"],
    usage: '',
    description: '',
    cooldown: 0,
    userPermissions: [],
    botPermissions: [],
    // toggleOff: true,

    run: async (client, message, args, ee) => {
        try {

            const {
                member,
                guild,
            } = message;

            const {
                channel
            } = member.voice;


            const search = args.join(" ")

            const VoiceChannel = member.voice.channel;

            if (!VoiceChannel) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} Please Join a Voice Channel`)
                ],
            });

            if (channel.userLimit != 0 && channel.full)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Your Voice Channel is full, I can't join!`)
                    ],
                });


            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`I am already playing music in <#${guild.me.voice.channelId}>`)
                ],

            });

            const Volume = Number(args[0]);

            if (!Volume) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.mediancolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.m} Please specify a number between 1 and 150`)
                ]
            });

            if (Volume > 150 || Volume < 1)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.mediancolor)
                        .setTimestamp()
                        .setTitle(`${client.allEmojis.m} Please specify a number between 1 and 150`)
                    ]
                });

            client.distube.setVolume(VoiceChannel, Volume);
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.music.volume} Volume has been set to \`${Volume}\`!`)
                ]
            });


        } catch (e) {
            console.log(e)
            return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`⛔ Error`)
                    .setDescription(`${e}`)
                ]
            })
        }
    }
}