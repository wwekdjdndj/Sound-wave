const config = require('../../botconfig/config.json');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Plays a Song',
    cooldown: 0,
    userPermissions: [],
    botPermissions: [],
    // toggleOff: true,
    options: [{
        name: "query",
        description: "Provide a name or a url for the song",
        type: "STRING",
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

            client.distube.playVoiceChannel(VoiceChannel, options.getString("query"), {
                textChannel: channel,
                member: member
            });
            return interaction.reply({
                content: `>>> ${client.allEmojis.music.searching} Searching: **${options.getString("query")}**`,
                ephemeral: true
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