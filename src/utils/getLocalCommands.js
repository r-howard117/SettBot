const path = require("path");
const getAllFiles = require("./getAllFiles");
/**
 * 
 * @returns all command files located in the source directory
 */
module.exports = () => {
    let localCommands = [];

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    )

    for (let commandCategory of commandCategories){
        let commandFiles = getAllFiles(commandCategory);

        for(let commandFile of commandFiles){
            const commandObject = require(commandFile);
            localCommands.push(commandObject);
        }
    }
    return localCommands;
}