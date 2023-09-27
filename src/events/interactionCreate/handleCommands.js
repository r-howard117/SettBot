const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

/**
 * Handles commands before calling the appropriate command function. Checks for
 * command properties including developer only and test only. Also verifies
 * that the bot has all required permissions to run each command.
 * @param {*} client the bot client
 * @param {*} interaction the interaction sent from the Discord user
 * @returns a function to handle commands
 */
module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if(commandObject.devOnly) {
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: "Only developers can run this command.",
                    ephemeral: true,
                });
                return;
            } 
        }
        if(commandObject.testOnly) {
            if(!devs.includes(interaction.guild.id === testServer)){
                interaction.reply({
                    content: "Only developers cannot be run here.",
                    ephemeral: true,
                });
                return;
            }
            
        }

        if(commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: "Not enough permissions.",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.member.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`Error running command: ${error}`);
    }
}