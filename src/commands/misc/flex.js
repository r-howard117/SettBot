/**
 * Sends a gif of Sett doing situps as a message
 */
module.exports =  {
    name: "flex",
    description: ".",
    callback: (client, interaction) => {
        interaction.reply(
            "https://tenor.com/view/sett-league-of-legends-lol-situps-gif-16052446");
    }
}
