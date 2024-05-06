async function auto(interaction, kazagumo) {
    const focused = interaction.options.getFocused();
    if (!focused) return;
    const res = await kazagumo.search(focused);
    const limitedResult = res.tracks.slice(0,10);
    const result = limitedResult.map(res => {
      let value = res.title;
      if (value.length > 100) {
        value = value.substring(0,97) + '...';
      }
      return {
        name: value,
        value: value,
    };
    })
    interaction.respond(result).catch(()=>{});
  }

module.exports = {auto}