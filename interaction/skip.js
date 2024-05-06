//const { KazagumoPlayer } = require('kazagumo');

module.exports = {
    name: "skip",
    once: false,
    async execute(client, interaction, kazagumo) {
        try {
            const player = kazagumo.getPlayer(interaction.guildId);
            if (!player) return interaction.reply('There is no player!');
            if (player.queue.isEmpty) return interaction.reply('There is no next track!');

            player.skip();
            return interaction.reply(`The music has been skipped`);
        } catch (err) {
            console.log(err);
        }
    }
}