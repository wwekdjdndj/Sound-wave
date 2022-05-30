const config = require('../../botconfig/config.json');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Changes the volume!',
    cooldown: 0,
    userPermissions: [],
    botPermissions: [],
    // toggleOff: true,
    options: [{
        name: "percent",
        description: "Provide a volume percent between 1 and 150",
        type: "NUMBER",
        required: true,
    }],

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

            const Volume = options.getNumber("percent");
            if (Volume > 150 || Volume < 1)
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.mediancolor)
                        .setTimestamp()
                        .setTitle(`${client.allEmojis.m} Please specify a number between 1 and 150`)
                    ]
                });

            client.distube.setVolume(VoiceChannel, Volume);
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.music.volume} Volume has been set to \`${Volume}\`!`)
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