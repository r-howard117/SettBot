const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
/**
 * Retrieves events and initializes reactions to them.
 * @param {*} client the bot client
 */
module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    for (let eventFolder of eventFolders) {
        let eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a > b);

        let eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        
        client.on(eventName, async (arg) => {
            for(let eventFile of eventFiles){
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        })
    }
};