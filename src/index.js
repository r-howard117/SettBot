require("dotenv").config();
const { Client, IntentsBitField, Events } = require('discord.js');
const axios = require("axios");
const eventHandler = require("./handlers/eventHandler");
/**
 * Initializes the bot client and calls the eventHandler.
 */
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

eventHandler(client);

client.login(process.env.TOKEN);

