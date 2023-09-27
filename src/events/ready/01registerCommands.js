const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

/**
 * Registers all command files so they are usable in Discord. Checks for edits
 * from previous versions of existing commands and updates accordingly.
 * @param {*} client the bot client
 */
module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client);

        for (const localCommand of localCommands){
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            )
            if (existingCommand) {
                if(localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command: ${name}`)
                    continue;
                }


                if (areCommandsDifferent(existingCommand, localCommand)){
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    });

                    console.log(`Edited command: ${name}`)
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping registration of command "${name} as it is set to delete`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                })
                console.log("command created?");

                console.log(`Registered command: ${name}`);
            }
        }
    } catch (error) {
        console.log(`Error loading command: ${error} `);
    }
}