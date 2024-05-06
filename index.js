const Discord = require('discord.js');
const path = require("node:path");
const fs = require('node:fs');
const yts = require('yt-search');

const { auto } = require('./autocomplete')

const { token, url, pass } = require('./config.json');
const { Kazagumo } = require('kazagumo');
const { Connectors } = require("shoukaku");

const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildVoiceStates, Discord.GatewayIntentBits.MessageContent]});

const Nodes = [{
  name: 'sus',
  url: url,
  auth: pass,
  secure: true,
}];

const kazagumo = new Kazagumo({
  defaultSearchEngine: 'youtube',
  send: (guildId, payload) => {
    const guild = client.guilds.cache.get(guildId);
    if (guild) guild.shard.send(payload);
}
}, new Connectors.DiscordJS(client), Nodes);

client.on("ready", () => console.log(client.user.username + " Ready!"));

kazagumo.shoukaku.on('ready', (name) => console.log(`Lavalink ${name}: Ready!`));
kazagumo.shoukaku.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error));
kazagumo.shoukaku.on('close', (name, code, reason) => {console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`); kazagumo.players.delete()});
kazagumo.shoukaku.on('debug', (name, info) => console.debug(`Lavalink ${name}: Debug,`, info));
kazagumo.shoukaku.on('disconnect', (name, players, moved) => {
    if (moved) return;
    players.map(player => player.connection.disconnect())
    console.warn(`Lavalink ${name}: Disconnected`);
});

kazagumo.on('playerStart', (player, track) => {
  if (player.loop !== 'none') return;
  console.log(`The track ${track.title} is playing now`);
  const channel = client.channels.cache.get(player.textId);

  channel.send(`Started playing **${track.title}**`);
});

kazagumo.on('playerEmpty', (player) => {
  if (player) player.destroy();
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  //const curr_player = kazagumo.getPlayer(oldState.guild.id);
  //if (!curr_player) return;
  //if (!newState.channel && (oldState.member.id == client.user.id || (oldState.channel.members.size < 2 && oldState.channel.members.has(client.user.id)))) {
  //  if (curr_player) curr_player.destroy();
  //}
})

client.on("interactionCreate", async interaction => {
  if (interaction.isAutocomplete()) return await auto(interaction, kazagumo);

  const interactionPath = path.join(__dirname, 'interaction');
    const interactionFiles = fs.readdirSync(interactionPath).filter(file => file.endsWith('.js'));

    for (const file of interactionFiles) {
	    const filePath = path.join(interactionPath, file);
	    const event = require(filePath);
        
      if (event.name == interaction.commandName) event.execute(client, interaction, kazagumo);
}
});

client.login(token);