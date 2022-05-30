const config = require(`../botconfig/config.json`);
const ee = require(`../botconfig/embed.json`);
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const Discord = require("discord.js");
const {
    escapeRegex
} = require(`../handlers/functions`);
const Schema = require('../models/MusicMenuSchema');

module.exports = (client) => {
    const description = {
        name: "Music Menu System",
    }
    client.logger(`〢 Module: Loaded ${description.name}`.bold.green);


    client.on("interactionCreate", async (interaction) => {
        try {

            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;
            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) return;
            if (!interaction.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS)) return;

            Schema.findOne({
                Guild: interaction.guild.id
            }, async (e, data) => {
                if (!data) return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setTitle(`${client.allEmojis.x} Music Menu System`)
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`No __Music Menu Channel__ Found`)
                    ],
                    ephemeral: true
                })

                if (interaction.isSelectMenu()) {

                    if (interaction.customId !== "Music-Menu-System") return;

                    if (!["menu-music-song-1", "menu-music-song-2", "menu-music-song-3", "menu-music-song-4", "menu-music-song-5", "menu-music-song-6", "menu-music-song-7", "menu-music-song-8", "menu-music-song-9", "menu-music-song-10", "menu-music-song-11", "menu-music-song-12", "menu-music-song-13"].includes(interaction.values[0])) return;

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

                    switch (interaction.values[0]) {
                        case "menu-music-song-1":
                            client.distube.playVoiceChannel(VoiceChannel, `https://open.spotify.com/playlist/7sZbq8QGyMnhKPcLJvCUFD`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **NCS | No Copyrighted Music**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-2":
                            client.distube.playVoiceChannel(VoiceChannel, `https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Pop**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-3":
                            client.distube.playVoiceChannel(VoiceChannel, `https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Default**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-4":
                            client.distube.playVoiceChannel(VoiceChannel, `https://www.youtube.com/watch?v=NX7BqdQ1KeU&list=PLYUn4YaogdahwfEkuu5V14gYtTqODx7R2`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Rock**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-5":
                            client.distube.playVoiceChannel(VoiceChannel, `https://www.youtube.com/watch?v=iFOAJ12lDDU&list=PLYUn4YaogdahPQPTnBGCrytV97h8ABEav`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Old Gaming**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-6":
                            client.distube.playVoiceChannel(VoiceChannel, `https://open.spotify.com/playlist/4a54P2VHy30WTi7gix0KW6`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Gaming**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-7":
                            client.distube.playVoiceChannel(VoiceChannel, `https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Charts**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-8":
                            client.distube.playVoiceChannel(VoiceChannel, `https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Chill**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-9":
                            client.distube.playVoiceChannel(VoiceChannel, `https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Jazz**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-10":
                            client.distube.playVoiceChannel(VoiceChannel, `https://open.spotify.com/playlist/37i9dQZF1DXd9rSDyQguIk`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Blues**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-11":
                            client.distube.playVoiceChannel(VoiceChannel, `https://open.spotify.com/playlist/6xGLprv9fmlMgeAMpW0x51`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Strange Fruits**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-12":
                            client.distube.playVoiceChannel(VoiceChannel, `https://www.youtube.com/watch?v=WvMc5_RbQNc&list=PLYUn4Yaogdagvwe69dczceHTNm0K_ZG3P`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Magic Release**`,
                                ephemeral: true
                            });
                            break;
                        case "menu-music-song-13":
                            client.distube.playVoiceChannel(VoiceChannel, `https://open.spotify.com/playlist/37i9dQZF1DX9qNs32fujYe`, {
                                textChannel: channel,
                                member: member
                            });
                            return interaction.reply({
                                content: `>>> ${client.allEmojis.music.searching} Playing: **Metal**`,
                                ephemeral: true
                            });
                            break;
                    }
                }

            })

        } catch (err) {
            console.log(err)
        }
    })

    client.on("messageCreate", async (message) => {
        if (!message.guild) return;

        Schema.findOne({
            Guild: message.guild.id
        }, async (e, data) => {
            if (!data) return;

            const MenuMusicChannel = data.Channel;

            if (!MenuMusicChannel) return;

            if (MenuMusicChannel != message.channel.id) return;

            if (message.author.id === client.user.id) {
                await delay(5000);
                message.delete().catch((e) => {})
            }
        })

    })

}

function delay(delayInms) {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    } catch (e) {
        console.log(String(e.stack).grey.bgRed)
    }
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