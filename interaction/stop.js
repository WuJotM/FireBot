//const { KazagumoPlayer } = require('kazagumo');

module.exports = {
    name: "stop",
    once: false,
    async execute(client, interaction, kazagumo) {
        try {
            const player = kazagumo.getPlayer(interaction.guildId);
            if (!player) return interaction.reply('There is no player!');

            player.destroy();
        } catch (err) {
            console.log(err);
        }
    }
}