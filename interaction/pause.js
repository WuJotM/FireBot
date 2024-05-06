module.exports = {
    name: "pause",
    once: false,
    async execute(client, interaction, kazagumo) {
        try {
            let player = kazagumo.getPlayer(interaction.guildId);
            if (!player) return interaction.reply("There is no track");
            !player.paused ? player.pause(true) : interaction.reply("the music is already paused");
        } catch (err) {console.log(err)};
}}