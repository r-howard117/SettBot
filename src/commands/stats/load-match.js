require("dotenv").config();
const {ApplicationCommandOptionType, } = require('discord.js');
const axios = require("axios");

/**
 * A global variable containing all data from a match ID
 */
match = {};

/**
 * Takes a match ID from user then retrieves all stats from that match from
 * the Riot API, before setting the global match variable to contain that data.
 */
module.exports =  {
    name: "load-match",
    description: "Loads match from ID# into SettBot.",
    options: [
        {
            name: "match-id",
            description: "Paste your match ID # here.",
            required: true,
            type: ApplicationCommandOptionType.Number,
        }
    ],
    //devOnly: Boolean,
    //testOnly: Boolean,
    //deleted: true,

    callback: async (client, interaction) => {
        let matchId = interaction.options.get("match-id").value;

        let getMatch = async () => {
            let response = await axios.default.get(
                "https://americas.api.riotgames.com/lol/match/v5/matches/"
                + "NA1_" + matchId + "/?api_key=" + process.env.RIOT_API_KEY);
            return response.data;
        }
        match = await getMatch();
        interaction.reply("Match data successfully found. *Let's see who the boss is.*")
    }
}