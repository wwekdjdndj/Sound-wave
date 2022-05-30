const config = require('../../botconfig/config.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton
} = require('discord.js');
const Schema = require('../../models/MusicMenuSchema');

module.exports = {
    name: "music-menu",
    aliases: [],
    description: "",
    cooldown: 0,
    userPermissions: ["ADMINISTARTOR"],
    botPermissions: [],

    run: async (client, message, args, ee) => {
        try {

            const channel = message.mentions.channels.first();
            if (!channel) return message.reply({
                embeds: [new MessageEmbed()
                    .setTitle(`${client.allEmojis.m} Music Menu System`)
                    .setColor(ee.mediancolor)
                    .setFooter(ee.footertext, ee.footericon)
                    .setDescription(`Please mention a channel!`)
                ]
            });


            Schema.findOne({
                Guild: message.guild.id
            }, async (err, data) => {
                setTimeout(() => {
                    if (data) {
                        data.Channel = channel.id,
                            data.save();
                    } else {
                        new Schema({
                            Guild: message.guild.id,
                            Channel: channel.id,
                        }).save();
                    }
                }, 5000);

                let MusicMenuOptions = [{
                    label: 'NCS | No Copyrighted Music',
                    description: 'NCS | No Copyrighted Music',
                    value: 'menu-music-song-1',
                    emoji: '0️⃣',
                }, {
                    label: 'Pop',
                    description: 'Pop',
                    value: 'menu-music-song-2',
                    emoji: '1️⃣',
                }, {
                    label: 'Default',
                    description: 'Default',
                    value: 'menu-music-song-3',
                    emoji: '2️⃣',
                }, {
                    label: 'Rock',
                    description: 'Rock',
                    value: 'menu-music-song-4',
                    emoji: '3️⃣',
                }, {
                    label: 'Old Gaming',
                    description: 'Old Gaming',
                    value: 'menu-music-song-5',
                    emoji: '4️⃣',
                }, {
                    label: 'Gaming',
                    description: 'Gaming',
                    value: 'menu-music-song-6',
                    emoji: '5️⃣',
                }, {
                    label: 'Charts',
                    description: 'Charts',
                    value: 'menu-music-song-7',
                    emoji: '6️⃣',
                }, {
                    label: 'Chill',
                    description: 'Chill',
                    value: 'menu-music-song-8',
                    emoji: '7️⃣',
                }, {
                    label: 'Jazz',
                    description: 'Jazz',
                    value: 'menu-music-song-9',
                    emoji: '8️⃣',
                }, {
                    label: 'Blues',
                    description: 'Blues',
                    value: 'menu-music-song-10',
                    emoji: '9️⃣',
                }, {
                    label: 'Strange Fruits',
                    description: 'Strange Fruits',
                    value: 'menu-music-song-11',
                    emoji: '🔟',
                }, {
                    label: 'Magic Release',
                    description: 'Magic Release',
                    value: 'menu-music-song-12',
                    emoji: '🔢',
                }, {
                    label: 'Metal',
                    description: 'Metal',
                    value: 'menu-music-song-13',
                    emoji: '🔢',
                }, ];

                let MusicMenuSelection = new MessageSelectMenu()
                    .setCustomId("Music-Menu-System")
                    .setPlaceholder("Click me to Choose the Music Playlist")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(MusicMenuOptions.filter(Boolean))


                const MusicButtons = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('music-skip')
                        .setEmoji("⏭️")
                        .setLabel('Skip')
                        .setStyle('SECONDARY'),
                        new MessageButton()
                        .setCustomId('music-pause')
                        .setEmoji("⏸️")
                        .setLabel('Pause')
                        .setStyle('SECONDARY'),
                        new MessageButton()
                        .setCustomId('music-resume')
                        .setEmoji("▶️")
                        .setLabel('Resume')
                        .setStyle('SECONDARY'),
                        new MessageButton()
                        .setCustomId('music-stop')
                        .setEmoji("⏹")
                        .setLabel('Stop')
                        .setStyle('SECONDARY'),
                    );

                const MusicButtons2 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('music-shuffle')
                        .setEmoji("🔀")
                        .setLabel('Shuffle')
                        .setStyle('SECONDARY'),
                        new MessageButton()
                        .setCustomId('music-autoplay')
                        .setEmoji("🔁")
                        .setLabel('Autoplay')
                        .setStyle('SECONDARY'),
                        new MessageButton()
                        .setCustomId('music-loop')
                        .setEmoji("🔂")
                        .setLabel('Loop')
                        .setStyle('SECONDARY'),
                        new MessageButton()
                        .setCustomId('music-queue')
                        .setEmoji("📑")
                        .setLabel('Queue')
                        .setStyle('SECONDARY'),
                    );


                const embed = new MessageEmbed()
                    .setAuthor(`Start Listening Your Favourite Music's`, client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle(`Avaliable Playlists:`)
                    .setThumbnail(message.guild.iconURL({
                        dynamic: true
                    }))
                    .setFooter(message.guild.name, message.guild.iconURL({
                        dynamic: true
                    }))
                    .setImage(`https://cdn.discordapp.com/attachments/907875631000334346/929746731086774272/ezgif.com-gif-maker_1.gif`)
                    .setColor(ee.color)
                    .addFields([{
                            name: "Playlist 1",
                            value: `NCS`,
                            inline: true,
                        },
                        {
                            name: "Playlist 2",
                            value: `Pop`,
                            inline: true,
                        },
                        {
                            name: "Playlist 3",
                            value: `Default`,
                            inline: true,
                        },
                        {
                            name: "Playlist 4",
                            value: `Rock`,
                            inline: true,
                        },
                        {
                            name: "Playlist 5",
                            value: `Old Gaming`,
                            inline: true,
                        },
                        {
                            name: "Playlist 6",
                            value: `Gaming`,
                            inline: true,
                        },
                        {
                            name: "Playlist 7",
                            value: `Charts`,
                            inline: true,
                        },
                        {
                            name: "Playlist 8",
                            value: `Chill`,
                            inline: true,
                        },
                        {
                            name: "Playlist 9",
                            value: `Jazz`,
                            inline: true,
                        },
                        {
                            name: "Playlist 10",
                            value: `Blues`,
                            inline: true,
                        },
                        {
                            name: "Playlist 11",
                            value: `Strange Fruits`,
                            inline: true,
                        },
                        {
                            name: "Playlist 12",
                            value: `Magic Release`,
                            inline: true,
                        },
                        {
                            name: "Playlist 13",
                            value: `Metal`,
                            inline: true,
                        },
                    ])

                const MusicMenus = new MessageActionRow()
                    .addComponents([MusicMenuSelection])


                message.reply({
                    embeds: [new MessageEmbed()
                        .setTitle(`${client.allEmojis.y} Music Menu System`)
                        .setColor(ee.color)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(`${channel} has been set as the **Music Menu Channel**`)
                    ]
                });

                channel.send({
                    embeds: [embed],
                    components: [MusicMenus, MusicButtons, MusicButtons2]
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
