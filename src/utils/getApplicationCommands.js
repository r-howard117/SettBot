/**
 * 
 * @param {*} client the bot client
 * @param {*} guildId the ID for the server the bot is in
 * @returns 
 */
module.exports = async (client, guildId) => {
    let applicationCommands;

    if (guildId) {
        const guild = await client.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = await client.application.commands;
        console.log(applicationCommands);
    }

    await applicationCommands.fetch();
    return applicationCommands;
}