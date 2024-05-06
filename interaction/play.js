const { Kazagumo } = require("kazagumo")

module.exports = {
    name: "play",
    once: false,
    async execute(client, interaction, kazagumo) {
        try {
            await interaction.deferReply().catch((err) => {
                console.error(err);
                interaction.reply({ content: 'An error occurred while deferring the reply.', ephemeral: true });
            });
            const string = interaction.options.getString('url');

            const { channel } = interaction.member.voice;
            if (!channel) return await interaction.editReply({content: 'Join to vc!'});
            
            let player = kazagumo.getPlayer(interaction.guildId);

            if (!player) {
                player = await kazagumo.createPlayer({
                    guildId: interaction.guild.id,
                    voiceId: channel.id,
                    volume: 20,
                });
            }

            player.setTextChannel(interaction.channel.id);
            player.setVoiceChannel(channel.id);

            console.log(player.destroyed);

            let result = await kazagumo.search(string, { requester: interaction.author });
            if (!result.tracks.length) return await interaction.editReply(({content: "No results found"}));

            result.type === "PLAYLIST" ? player.queue.add(result.tracks) : player.queue.add(result.tracks[0]);
            if (!player.playing && !player.paused) player.play().encoded;
            return await interaction.editReply({content: result.type === "PLAYLIST" ? `Queued ${result.tracks.length} tracks from ${result.playlistName}` : `Queued **${result.tracks[0].title}**`});
        } catch (err) {
            console.log(err);
        }
    }
}