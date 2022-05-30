const Discord = require(`discord.js`);
const config = require(`../botconfig/config.json`);
const ee = require(`../botconfig/embed.json`);
const {
  MessageButton,
  MessageActionRow,
  MessageEmbed
} = require(`discord.js`);

module.exports = async (client) => {
  client.logger(`Loading Distube`.bold.yellow);
  try {

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


    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    client.distube
      .on("playSong", (queue, song) => queue.textChannel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`${status(queue)}`)
          .setAuthor(`${song.name} - ${song.formattedDuration}`, `${client.allEmojis.music.playImg}`, song.url)
          .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
          .setFooter(`Requested By: ${song.user.tag}`, song.user.displayAvatarURL({
            dynamic: true
          }))
        ],
        components: [MusicButtons, MusicButtons2]
      }))
      .on("addSong", (queue, song) => queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
          .setFooter("Added By: " + song.user.tag, song.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(`${client.allEmojis.y} Song Added to the Queue`)
          .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue`)
        ]
      }))
      .on("addList", (queue, playlist) => queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
          .setFooter("Added By: " + playlist.user.tag, playlist.user.displayAvatarURL({
            dynamic: true
          }))
          .setTitle(`${client.allEmojis.y} Playlist Added to the Queue`)
          .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        ]
      }))
      .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send({
          embeds: [
            new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
            .setTitle(`Choose an option from below`)
            .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
          ]
        })
      })
      .on("searchCancel", message => message.channel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
          .setTitle(`⛔️ Searching Canceled`)
        ]
      }))
      .on("error", (channel, e) => {
        console.error(e);
        channel.send({
          embeds: [
            new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
            .setTitle(`⛔️ Error`)
            .setDescription(`${e}`)
          ]
        })
      })
      .on("empty", queue => queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
          .setTitle(`⛔️ Leaving Channel`)
          .setDescription(`Voice channel is empty! Leaving the channel...`)
        ]
      }))
      .on("searchNoResult", message => message.channel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
          .setDescription(`**No result found!**`)
        ]
      }))
      .on("finish", queue => queue.textChannel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("⛔️ SONG FINISHED, LEAVING...")
          .setDescription("🎧 **There are no more songs in the queue leaving...**")
          .setTimestamp()
        ]
      }))
  } catch (e) {

  }
  client.logger(`Distube Loaded`.brightGreen);
};

/**
 * @INFO
 * Bot Coded by Zedro#2742 | https://discord.gg/8fYUFxMtAq
 * @INFO
 * Work for Milanio Development | https://discord.gg/8fYUFxMtAq
 * @INFO
 */