module.exports = {
    name: "unpause",
    once: false,
    async execute(client, interaction, kazagumo) {
        try {
            let player = kazagumo.getPlayer(interaction.guildId);
            if (!player) return interaction.reply("There is no track");
            player.paused ? player.pause(false) : interaction.reply("The music is already unpaused");
        } catch (err) {console.log(err)};
}}