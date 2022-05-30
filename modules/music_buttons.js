const config = require(`../botconfig/config.json`);
const ee = require(`../botconfig/embed.json`);
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const Discord = require("discord.js");

module.exports = function (client, options) {
    const description = {
        name: "Music Buttons",
    }
    client.logger(`〢 Module: Loaded ${description.name}`.bold.green);

    client.on("interactionCreate", async (interaction) => {
        try {

            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) return;
            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) return;

            if (!interaction.isButton()) return;
            if (!["music-skip", "music-pause", "music-resume", "music-stop", "music-shuffle", "music-autoplay", "music-loop", "music-queue"].includes(interaction.customId)) return;

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
                    .setDescription(`**I am already playing music in <#${guild.me.voice.channelId}>**`)
                ],
                ephemeral: true
            });

            const queue = await client.distube.getQueue(VoiceChannel);
            if (!queue) return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setTimestamp()
                    .setTitle(`${client.allEmojis.x} There is no Song in the Queue.`)
                ],
                ephemeral: true
            });

            switch (interaction.customId) {
                case "music-skip":
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
                    // interaction.deferUpdate();
                    break;
                case "music-pause":
                    await queue.pause(VoiceChannel);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setTimestamp()
                            .setTitle(`${client.allEmojis.music.pause} Song has been Paused!`)
                            .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                        ]
                    });
                    // interaction.deferUpdate();
                    break;
                case "music-resume":
                    await queue.resume(VoiceChannel);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setTimestamp()
                            .setTitle(`${client.allEmojis.music.resume} Song has been resumed`)
                            .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                        ]
                    });
                    //interaction.deferUpdate();
                    break;
                case "music-stop":
                    await queue.stop(VoiceChannel);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setTimestamp()
                            .setTitle(`${client.allEmojis.music.stop} Stopped playing and Leaving the Voice Channel`)
                            .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                        ]
                    });
                    // interaction.deferUpdate();
                    break;
                case "music-shuffle":
                    await queue.shuffle(VoiceChannel);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setTimestamp()
                            .setTitle(`${client.allEmojis.music.shuffle} Song has been shuffled`)
                            .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                        ]
                    });
                    // interaction.deferUpdate();
                    break;
                case "music-autoplay":
                    let Mode = await queue.toggleAutoplay(VoiceChannel);
                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setTimestamp()
                            .setTitle(`${client.allEmojis.music.autoplay} Autoplay Mode is set to: \`${Mode ? "On" : "Off"}\``)
                            .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                        ]
                    });
                    // interaction.deferUpdate();
                    break;
                case "music-loop":
                    let Mode2 = await client.distube.setRepeatMode(queue);

                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setTimestamp()
                            .setTitle(`${client.allEmojis.music.loop} Loop Mode is set to: \`${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}\``)
                            .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp()
                        ]
                    });
                    // interaction.deferUpdate();
                    break;
                case "music-queue":
                    const q = queue.songs.map((song, i) => `${i === 0 ? "**Playing:**" : `**${i})**`} ${song.name} - \`${song.formattedDuration}\``).join("\n")

                    return interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(ee.color)
                            .setTitle(`${client.allEmojis.music.queue} Queue of ${interaction.guild.name}`)
                            .setDescription(`${q}`)
                        ]
                    });
                    // interaction.deferUpdate();
                    break;
            }

        } catch (err) {
            console.log(err)
        }
    })
}


/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/milanio
 * @INFO
 * Work for Milanio Development | https://discord.gg/milanio
 * @INFO
 * Please Mention Us Milanio Development, When Using This Code!
 * @INFO
 */
