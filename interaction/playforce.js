const { KazagumoTrack } = require("kazagumo");

module.exports = {
    name: "playforce",
    once: false,
    async execute(client, interaction, kazagumo) {
        if (interaction.isAutocomplete()) return;
        try {
            const player = kazagumo.getPlayer(interaction.guildId);
            if (!player) return interaction.reply('There is no player!');

            const string = interaction.options.getString('url');

            let result = await kazagumo.search(string, { requester: interaction.author });
            if (!result.tracks.length) return await interaction.reply(({content: "No results found"}));

            player.play(new KazagumoTrack(result.tracks[0].getRaw(), interaction.author));
            return interaction.reply(`Force playing **${result.tracks[0].title}**`);

        } catch (err) {
        }
    }
}