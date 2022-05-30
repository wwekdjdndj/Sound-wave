const config = require('../../botconfig/config.json');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: [],
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


            const VoiceChannel = member.voice.channel;

            if (!VoiceChannel) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} Please Join a Voice Channel`)
                ]
            });

            if (channel.userLimit != 0 && channel.full)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle(`Your Voice Channel is full, I can't join!`)
                    ]
                });


            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`I am already playing music in <#${guild.me.voice.channelId}>`)
                ]
            });

            const queue = await client.distube.getQueue(VoiceChannel);
            if (!queue) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} There is no Song in the Queue.`)
                ]
            });
            
            const q = queue.songs.map((song, i) => `${i === 0 ? "**Playing:**" : `**${i})**`} ${song.name} - \`${song.formattedDuration}\``).join("\n")

            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`${client.allEmojis.music.queue} Queue of ${message.guild.name}`)
                    .setDescription(`${q}`)
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