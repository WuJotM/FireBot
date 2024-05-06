const path = require('path');
const fs = require('node:fs');

module.exports = {
    name: "playlist",
    once: false,
    async execute(client, interaction, kazagumo) {
        const interactionPath = path.join(__dirname, 'playlist');
        const interactionFiles = fs.readdirSync(interactionPath).filter(file => file.endsWith('.js'));

        for (const file of interactionFiles) {
	        const filePath = path.join(interactionPath, file);
	        const event = require(filePath);
        
        if (event.name == interaction.options._subcommand) event.execute(client, interaction, kazagumo);
    }
    }
}