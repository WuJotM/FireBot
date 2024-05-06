module.exports = {
    name: "loop",
    once: false,
    async execute(client, interaction, kazagumo) {
        try {
            const player = kazagumo.getPlayer(interaction.guildId);
            if (!player) return interaction.reply('There is no player!');

            if (player.loop === "none") {
                interaction.reply("The music has been looped");
                player.setLoop("track");
            } else {
                interaction.reply("The music is not looped longer");
                player.setLoop("none");
            }

        } catch (err) {
            console.log(err);
        }
    }
}