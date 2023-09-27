/**
 * Prints to console if the bot is on and ready for use.
 * @param {*} client the bot client
 */
module.exports = (client) => {
    console.log(`\u2714 ${client.user.tag} is ready to rumble.`)
}