const config = require('../../botconfig/config.json');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'Skips the current song',
    cooldown: 0,
    userPermissions: [],
    botPermissions: [],
    // toggleOff: true,

    run: async (client, interaction, args, ee) => {
        const {
            options,
            member,
            guild,
            channel
        } = interaction;

        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel) return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTimestamp()
                .setTitle(`${client.allEmojis.x} Please Join a Voice Channel`)
            ],
            ephemeral: true
        });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId) return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTimestamp()
                .setTitle(`I am already playing music in <#${guild.me.voice.channelId}>`)
            ],
            ephemeral: true
        });

        try {

            const queue = await client.distube.getQueue(VoiceChannel);
            if (!queue) return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} There is no Song in the Queue.`)
                ]
            });

            await queue.skip(VoiceChannel);
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.music.skip} Skipped to the next Song!`)
                    .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                ]
            });

        } catch (e) {
            console.log(e)
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`⛔ Error`)
                    .setDescription(`${e}`)
                ]
            })
        }

    }
}